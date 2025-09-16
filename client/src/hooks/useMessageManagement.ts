import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Message } from '../lib/utils';
import type { ChatMessage } from '../lib/api-client';

export const useMessageManagement = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null
  );
  const [displayedContent, setDisplayedContent] = useState<
    Record<string, string>
  >({});
  const [accumulatedContent, setAccumulatedContent] = useState<
    Record<string, string>
  >({});

  const addUserMessage = useCallback((content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: content.trim(),
    };
    setMessages(prev => [...prev, userMessage]);
    return userMessage;
  }, []);

  const addBotMessage = useCallback(() => {
    const botMessage: Message = {
      id: uuidv4(),
      type: 'bot',
      content: '',
    };
    setMessages(prev => [...prev, botMessage]);
    setStreamingMessageId(botMessage.id);
    return botMessage;
  }, []);

  const updateBotMessage = useCallback((messageId: string, content: string) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === messageId ? { ...msg, content } : msg))
    );
  }, []);

  const finishStreaming = useCallback((newHistory: ChatMessage[]) => {
    setStreamingMessageId(null);
    setHistory(newHistory);
  }, []);

  const handleError = useCallback(
    (messageId: string, error?: string) => {
      const errorMessage = error
        ? `Error: ${error}`
        : 'Sorry, there was an error processing your message. Please try again.';
      updateBotMessage(messageId, errorMessage);
      setStreamingMessageId(null);
    },
    [updateBotMessage]
  );

  return {
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
  };
};
