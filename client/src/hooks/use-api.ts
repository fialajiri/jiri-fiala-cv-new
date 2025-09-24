import { useMutation } from '@tanstack/react-query';
import { api, type ChatRequest, type ChatMessage } from '../lib/api-client';

export interface StreamChunk {
  type: 'connected' | 'chunk' | 'done' | 'error';
  content?: string;
  history?: ChatMessage[];
}

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (data: ChatRequest) => api.sendMessage(data),
  });
};

export const useStreamingChat = () => {
  const sendStreamingMessage = async (
    data: ChatRequest,
    onChunk: (chunk: string) => void,
    onComplete: (history: ChatMessage[]) => void,
    onError: (error: string) => void
  ) => {
    // Create an AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/chat/stream`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        onError(`HTTP error! status: ${response.status}`);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        onError('No response body reader available');
        return;
      }

      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const chunkData = JSON.parse(line.slice(6)) as StreamChunk;

              switch (chunkData.type) {
                case 'chunk':
                  if (chunkData.content) onChunk(chunkData.content);
                  break;
                case 'done':
                  onComplete(chunkData.history || []);
                  return;
                case 'error':
                  onError(chunkData.content || 'Unknown streaming error');
                  return;
              }
            }
          }
        }
      } catch (error) {
        onError(error instanceof Error ? error.message : 'Streaming error');
      }
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        onError(
          'Request timeout - server may be offline. Terminal commands are still available.'
        );
      } else if (
        error instanceof TypeError &&
        error.message.includes('fetch')
      ) {
        onError('Server is offline. Terminal commands are still available.');
      } else {
        onError(error instanceof Error ? error.message : 'Network error');
      }
    }
  };

  return { sendStreamingMessage };
};
