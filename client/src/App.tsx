import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import { TerminalContainer } from './components';
import { useStreamingChat } from './hooks/use-api';
import { useMessageManagement } from './hooks/useMessageManagement';
import { getInitialMessages } from './lib/utils';
import type { ChatMessage } from './lib/api-client';
import { useCommandHandler } from './hooks/useCommandHandler';
import { useTypingAnimation } from './hooks/useTypingAnimation';

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
    updateBotMessage,
    finishStreaming,
    handleError,
  } = useMessageManagement();

  const { commandHistory, setCommandHistory, handleCommand } =
    useCommandHandler({
      setMessages,
      addBotMessage,
      updateBotMessage,
      getInitialMessages,
    });

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

  const onCommand = async (command: string) => {
    await handleCommand(command);
    setCurrentInput('');
  };

  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/cv/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <TerminalContainer
      messages={messages}
      currentInput={currentInput}
      setCurrentInput={setCurrentInput}
      onKeyPress={handleKeyPress}
      onCommand={onCommand}
      isTyping={isTyping}
      displayedContent={displayedContent}
      streamingMessageId={streamingMessageId}
      onDownload={handleDownload}
      commandHistory={commandHistory}
      setCommandHistory={setCommandHistory}
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
