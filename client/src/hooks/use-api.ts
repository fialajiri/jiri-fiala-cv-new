import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type ChatRequest, type ChatMessage } from '../lib/api-client';

// Types for streaming
export interface StreamChunk {
  type: 'connected' | 'chunk' | 'done' | 'error';
  content?: string;
  history?: ChatMessage[];
}

// Query keys
export const queryKeys = {
  health: ['health'] as const,
  chat: ['chat'] as const,
} as const;

// Health check hook
export const useHealthCheck = () => {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: api.healthCheck,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Chat mutation hook
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ChatRequest) => api.sendMessage(data),
    onSuccess: () => {
      // Invalidate chat queries to refetch if needed
      queryClient.invalidateQueries({ queryKey: queryKeys.chat });
    },
  });
};

// Chat history hook (if you want to store chat history in React Query)
export const useChatHistory = () => {
  return useQuery({
    queryKey: queryKeys.chat,
    queryFn: () => Promise.resolve([]), // This would be replaced with actual history fetching
    enabled: false, // Disabled by default since we're managing state locally
  });
};

// Streaming chat hook
export const useStreamingChat = () => {
  const sendStreamingMessage = async (
    data: ChatRequest,
    onChunk: (chunk: string) => void,
    onComplete: (history: ChatMessage[]) => void,
    onError: (error: string) => void
  ) => {
    try {
      const response = await fetch('http://localhost:3000/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body reader available');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep the last incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6)) as StreamChunk;

              switch (data.type) {
                case 'connected':
                  // Connection established
                  break;
                case 'chunk':
                  if (data.content) {
                    onChunk(data.content);
                  }
                  break;
                case 'done':
                  onComplete(data.history || []);
                  return;
                case 'error':
                  onError(data.content || 'Unknown streaming error');
                  return;
              }
            } catch (parseError) {
              console.error('Error parsing SSE data:', parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
      onError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return { sendStreamingMessage };
};
