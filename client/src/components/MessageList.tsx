import React from 'react';
import type { Message } from '../lib/utils';
import SystemMessage from './SystemMessage';
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';
import TypingIndicator from './TypingIndicator';
import './MessageList.css';

interface MessageListProps {
  messages: Message[];
  displayedContent: Record<string, string>;
  accumulatedContent: Record<string, string>;
  streamingMessageId: string | null;
  isTyping: boolean;
  isTypingRef: React.MutableRefObject<Record<string, boolean>>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  displayedContent,
  accumulatedContent,
  streamingMessageId,
  isTyping,
  isTypingRef,
}) => {
  const renderMessage = (message: Message) => {
    switch (message.type) {
      case 'system':
        return <SystemMessage key={message.id} message={message} />;
      case 'user':
        return <UserMessage key={message.id} message={message} />;
      case 'bot':
        return (
          <BotMessage
            key={message.id}
            message={message}
            displayedContent={displayedContent}
            accumulatedContent={accumulatedContent}
            streamingMessageId={streamingMessageId}
            isTypingRef={isTypingRef}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {messages.map(renderMessage)}
      {isTyping && !streamingMessageId && <TypingIndicator />}
    </>
  );
};

export default MessageList;
