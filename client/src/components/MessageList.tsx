import React from 'react';
import type { Message } from '../lib/utils';
import SystemMessage from './SystemMessage';
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';
import './MessageList.css';

interface MessageListProps {
  messages: Message[];
  displayedContent: Record<string, string>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  displayedContent,
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
          />
        );
      default:
        return null;
    }
  };

  return <>{messages.map(renderMessage)}</>;
};

export default MessageList;
