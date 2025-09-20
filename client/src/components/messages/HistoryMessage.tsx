import React from 'react';
import type { Message } from '../../lib/utils';
import './HistoryMessage.css';

interface HistoryMessageProps {
  message: Message;
}

const HistoryMessage: React.FC<HistoryMessageProps> = ({ message }) => {
  return (
    <div className="history-message">
      <div className="history-content">{message.content}</div>
    </div>
  );
};

export default HistoryMessage;
