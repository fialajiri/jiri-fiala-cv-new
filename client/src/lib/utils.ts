import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
}

export const getInitialMessages = (): Message[] => [
  {
    id: uuidv4(),
    type: 'system',
    content: 'AI Terminal v1.0.0 - Type your questions below',
  },
];
