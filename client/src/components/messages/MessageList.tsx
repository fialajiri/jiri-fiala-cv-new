import React from 'react';
import type { Message } from '../../lib/utils';
import { SystemMessage, UserMessage, BotMessage } from './';
import { DataDisplay } from '../displays';
import './MessageList.css';

interface MessageListProps {
  messages: Message[];
  displayedContent: Record<string, string>;
  onDownload?: (filename: string) => void;
  onSelectionComplete?: () => void;
  onInputStateChange?: (isActive: boolean) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  displayedContent,
  onDownload,
  onSelectionComplete,
  onInputStateChange,
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
            {message.componentType && (
              <DataDisplay
                type={message.componentType}
                data={message.componentData}
                onDownload={onDownload}
                onSelectionComplete={onSelectionComplete}
                onInputStateChange={onInputStateChange}
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
