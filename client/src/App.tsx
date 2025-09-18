import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import TerminalContainer from './components/TerminalContainer';
import { useStreamingChat } from './hooks/use-api';
import { useMessageManagement } from './hooks/useMessageManagement';
import { useTypingAnimation } from './hooks/useTypingAnimation';
import { getInitialMessages, type Message } from './lib/utils';
import type { ChatMessage } from './lib/api-client';
import { v4 as uuidv4 } from 'uuid';
import {
  loadContactData,
  loadEducationData,
  loadSkillsData,
  loadProjectsData,
  loadExperienceData,
} from './lib/dataLoader';

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
    updateBotMessage,
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

  const handleCommand = async (command: string) => {
    if (!command.trim()) return;

    // Add user command to messages
    addUserMessage(command);

    // Handle different commands
    switch (command.toLowerCase()) {
      case 'help': {
        const systemMessage: Message = {
          id: uuidv4(),
          type: 'system',
          content:
            'Available commands: skills experience project contact education download clear',
        };
        setMessages(prev => [...prev, systemMessage]);
        break;
      }
      case 'skills': {
        try {
          const data = await loadSkillsData();
          const componentMessage: Message = {
            id: uuidv4(),
            type: 'component',
            content: '',
            componentType: 'skills',
            componentData: data,
          };
          setMessages(prev => [...prev, componentMessage]);
        } catch (error) {
          console.error('Error loading skills data:', error);
          const errorMessage = addBotMessage();
          updateBotMessage(
            errorMessage.id,
            'Error loading skills data. Please try again.'
          );
        }
        break;
      }
      case 'experience': {
        try {
          const data = await loadExperienceData();
          const componentMessage: Message = {
            id: uuidv4(),
            type: 'component',
            content: '',
            componentType: 'experience',
            componentData: data,
          };
          setMessages(prev => [...prev, componentMessage]);
        } catch (error) {
          console.error('Error loading experience data:', error);
          const errorMessage = addBotMessage();
          updateBotMessage(
            errorMessage.id,
            'Error loading experience data. Please try again.'
          );
        }
        break;
      }
      case 'project': {
        try {
          const data = await loadProjectsData();
          const componentMessage: Message = {
            id: uuidv4(),
            type: 'component',
            content: '',
            componentType: 'projects',
            componentData: data,
          };
          setMessages(prev => [...prev, componentMessage]);
        } catch (error) {
          console.error('Error loading projects data:', error);
          const errorMessage = addBotMessage();
          updateBotMessage(
            errorMessage.id,
            'Error loading projects data. Please try again.'
          );
        }
        break;
      }
      case 'contact': {
        try {
          const data = await loadContactData();
          const componentMessage: Message = {
            id: uuidv4(),
            type: 'component',
            content: '',
            componentType: 'contact',
            componentData: data,
          };
          setMessages(prev => [...prev, componentMessage]);
        } catch (error) {
          console.error('Error loading contact data:', error);
          const errorMessage = addBotMessage();
          updateBotMessage(
            errorMessage.id,
            'Error loading contact data. Please try again.'
          );
        }
        break;
      }
      case 'download': {
        const botMessage = addBotMessage();
        updateBotMessage(
          botMessage.id,
          '== Download CV ==\nCV download functionality will be implemented here...'
        );
        break;
      }
      case 'education': {
        try {
          const data = await loadEducationData();
          const componentMessage: Message = {
            id: uuidv4(),
            type: 'component',
            content: '',
            componentType: 'education',
            componentData: data,
          };
          setMessages(prev => [...prev, componentMessage]);
        } catch (error) {
          console.error('Error loading education data:', error);
          const errorMessage = addBotMessage();
          updateBotMessage(
            errorMessage.id,
            'Error loading education data. Please try again.'
          );
        }
        break;
      }
      case 'clear':
        setMessages(getInitialMessages());
        break;
      default: {
        const botMessage = addBotMessage();
        updateBotMessage(
          botMessage.id,
          `Unknown command: ${command}. Type 'help' for available commands.`
        );
      }
    }

    setCurrentInput('');
  };

  return (
    <TerminalContainer
      messages={messages}
      currentInput={currentInput}
      setCurrentInput={setCurrentInput}
      onKeyPress={handleKeyPress}
      onCommand={handleCommand}
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
