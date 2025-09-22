import React, { useState, useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import { TerminalContainer } from './components';
import { useStreamingChat } from './hooks/use-api';
import { useMessageManagement } from './hooks/useMessageManagement';
import { getInitialMessages } from './lib/utils';
import { useCommandHandler } from './hooks/useCommandHandler';
import { useTypingAnimation } from './hooks/useTypingAnimation';
import type { ChatMessage } from './lib/api-client';
import { queryClient } from './lib/queryClient';
import { downloadCV } from './lib/downloadUtils';
import { initializeTheme } from './lib/themeUtils';

const AppContent: React.FC = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('matrix');

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
      currentTheme,
    });

  const typingAnimation = useTypingAnimation({
    displayedContent,
    accumulatedContent,
    setDisplayedContent,
    setAccumulatedContent,
  });

  const { sendStreamingMessage } = useStreamingChat();

  useEffect(() => {
    setMessages(getInitialMessages());
    // Initialize theme on app startup
    const theme = initializeTheme();
    setCurrentTheme(theme.id);
  }, [setMessages]);

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
    addUserMessage(command);
    await handleCommand(command);
    setCurrentInput('');
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
      onDownload={downloadCV}
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
