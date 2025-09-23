import React from 'react';
import type { Message } from '../../lib/utils';
import './PlainMessage.css';

interface PlainMessageProps {
  message: Message;
}

const PlainMessage: React.FC<PlainMessageProps> = ({ message }) => {
  return (
    <div className="plain-message">
      <span className="plain-text">{message.content}</span>
    </div>
  );
};

export default PlainMessage;
