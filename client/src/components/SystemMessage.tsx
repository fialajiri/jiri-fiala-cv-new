import React from 'react';
import type { Message } from '../lib/utils';
import './SystemMessage.css';

interface SystemMessageProps {
  message: Message;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ message }) => {
  return (
    <div className="system-message">
      <span className="system-label">[SYSTEM]</span>{' '}
      <span className="system-text">{message.content}</span>
    </div>
  );
};

export default SystemMessage;
