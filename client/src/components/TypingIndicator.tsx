import React from 'react';
import './TypingIndicator.css';

const TypingIndicator: React.FC = () => {
  return (
    <div className="message typing-message">
      <div className="prompt-line">
        <span className="bot-prompt">ai-bot@terminal</span>
        <span className="prompt-separator">:</span>
        <span className="prompt-path">~</span>
        <span className="prompt-dollar">$ </span>
      </div>
      <span className="thinking-text">
        Thinking<span className="thinking-dots">...</span>
      </span>
    </div>
  );
};

export default TypingIndicator;
