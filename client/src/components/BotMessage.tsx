import React from 'react';
import type { Message } from '../lib/utils';
import './BotMessage.css';

interface BotMessageProps {
  message: Message;
  displayedContent: Record<string, string>;
}

const BotMessage: React.FC<BotMessageProps> = ({
  message,
  displayedContent,
}) => {
  return (
    <div className="message bot-message">
      <div className="prompt-line">
        <div className="prompt-prefix">
          <span className="bot-prompt">ai-bot@terminal</span>
          <span className="prompt-separator">:</span>
          <span className="prompt-path">~</span>
          <span className="prompt-dollar">$ </span>
        </div>
        <div className="bot-text">
          {displayedContent[message.id] || message.content}
        </div>
      </div>
    </div>
  );
};

export default BotMessage;
