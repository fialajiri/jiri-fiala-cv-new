import React from 'react';
import type { Message } from '../../lib/utils';
import { SystemMessage, UserMessage, BotMessage } from './';
import { DataDisplay } from '../displays';
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
      case 'component':
        return (
          <div key={message.id} className="component-message">
            {message.componentType && message.componentData && (
              <DataDisplay
                type={message.componentType}
                data={message.componentData}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return <>{messages.map(renderMessage)}</>;
};

export default MessageList;
