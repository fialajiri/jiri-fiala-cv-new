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
    handleError,
  } = useMessageManagement();

  const typingAnimation = useTypingAnimation({
    displayedContent,
    accumulatedContent,
    setDisplayedContent,
    setAccumulatedContent,
  });

  const isTypingAnimationComplete = typingAnimation.isTypingAnimationComplete;

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
    const botMessage = addBotMessage();
    const botMessageId = botMessage.id;

    typingAnimation.initializeMessage(botMessageId);

    await sendStreamingMessage(
      { message: userMessage, history },
      (chunk: string) => typingAnimation.addChunk(botMessageId, chunk),
      (history: ChatMessage[]) => {
        finishStreaming(history);
        setIsTyping(false);
      },
      (error: string) => {
        handleError(botMessageId, error);
        setIsTyping(false);
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTyping) {
      if (!currentInput.trim()) return;

      addUserMessage(currentInput.trim());
      sendMessageToAPI(currentInput.trim());
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
      streamingMessageId={streamingMessageId}
      isTypingAnimationComplete={isTypingAnimationComplete}
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
