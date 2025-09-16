import React from 'react';
import type { Message } from '../lib/utils';
import './UserMessage.css';

interface UserMessageProps {
  message: Message;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="message user-message">
      <div className="prompt-line">
        <span className="user-prompt">user@terminal</span>
        <span className="prompt-separator">:</span>
        <span className="prompt-path">~</span>
        <span className="prompt-dollar">$&nbsp;</span>
        <span className="user-text">{message.content}</span>
      </div>
    </div>
  );
};

export default UserMessage;
