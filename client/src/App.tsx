import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import TerminalContainer from './components/TerminalContainer';
import { useStreamingChat } from './hooks/use-api';
import { useMessageManagement } from './hooks/useMessageManagement';
import { useTypingAnimation } from './hooks/useTypingAnimation';
import { getInitialMessages } from './lib/utils';
import type { ChatMessage } from './lib/api-client';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const AppContent: React.FC = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const {
    messages,
    setMessages,
    history,
    streamingMessageId,
    displayedContent,
    setDisplayedContent,
    accumulatedContent,
    setAccumulatedContent,
    addUserMessage,
    addBotMessage,
    finishStreaming,
    handleStreamingError,
    handleApiError,
  } = useMessageManagement();

  const typingAnimation = useTypingAnimation({
    displayedContent,
    accumulatedContent,
    setDisplayedContent,
    setAccumulatedContent,
  });

  // Initialize messages on mount
  useEffect(() => {
    setMessages(getInitialMessages());
  }, [setMessages]);

  // Clean up typing timeout on unmount
  useEffect(() => {
    return typingAnimation.cleanup;
  }, [typingAnimation.cleanup]);

  // Send message to API
  const { sendStreamingMessage } = useStreamingChat();

  const sendMessageToAPI = async (userMessage: string) => {
    setIsTyping(true);

    // Create a streaming bot message
    const botMessage = addBotMessage();
    const botMessageId = botMessage.id;

    // Initialize typing animation for this message
    typingAnimation.initializeMessage(botMessageId);

    try {
      await sendStreamingMessage(
        {
          message: userMessage,
          history,
        },
        // onChunk - add chunk to typing queue for live typing
        (chunk: string) => {
          typingAnimation.addChunk(botMessageId, chunk);
        },
        // onComplete - streaming finished
        (history: ChatMessage[]) => {
          finishStreaming(history);
          setIsTyping(false);
        },
        // onError - handle streaming errors
        (error: string) => {
          console.error('Streaming error:', error);
          handleStreamingError(botMessageId, error);
          setIsTyping(false);
        }
      );
    } catch (error) {
      console.error('Error sending message:', error);
      handleApiError(botMessageId);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTyping) {
      if (!currentInput.trim()) return;

      // Add user message
      addUserMessage(currentInput.trim());

      // Send message to API
      sendMessageToAPI(currentInput.trim());

      // Clear input
      setCurrentInput('');
    }
  };

  return (
    <TerminalContainer
      messages={messages}
      currentInput={currentInput}
      setCurrentInput={setCurrentInput}
      onKeyPress={handleKeyPress}
      isTyping={isTyping}
      displayedContent={displayedContent}
      accumulatedContent={accumulatedContent}
      streamingMessageId={streamingMessageId}
      isTypingRef={typingAnimation.isTypingRef}
    />
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
