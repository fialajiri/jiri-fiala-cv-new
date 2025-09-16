import React from 'react';
import type { Message } from '../lib/utils';
import './BotMessage.css';

interface BotMessageProps {
  message: Message;
  displayedContent: Record<string, string>;
  accumulatedContent: Record<string, string>;
  streamingMessageId: string | null;
  isTypingRef: { current: Record<string, boolean> };
}

const BotMessage: React.FC<BotMessageProps> = ({
  message,
  displayedContent,
  accumulatedContent,
  streamingMessageId,
  isTypingRef,
}) => {
  const isStreaming =
    streamingMessageId === message.id ||
    isTypingRef.current[message.id] ||
    (displayedContent[message.id] &&
      displayedContent[message.id] !== accumulatedContent[message.id]);

  return (
    <div className="message bot-message">
      <div className="prompt-line">
        <div className="prompt-prefix">
          <span className="bot-prompt">ai-bot@terminal</span>
          <span className="prompt-separator">:</span>
          <span className="prompt-path">~</span>
          <span className="prompt-dollar">$&nbsp; </span>
        </div>
        <div className="bot-text">
          {displayedContent[message.id] || message.content}
          {isStreaming && <span className="streaming-cursor">█</span>}
        </div>
      </div>
    </div>
  );
};

export default BotMessage;
