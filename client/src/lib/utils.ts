import { v4 as uuidv4 } from 'uuid';
import { ReactNode } from 'react';

export interface Message {
  id: string;
  type: 'user' | 'bot' | 'system' | 'component';
  content: string;
  component?: ReactNode;
  componentType?:
    | 'contact'
    | 'education'
    | 'skills'
    | 'projects'
    | 'experience';
  componentData?: any;
}

export const getInitialMessages = (): Message[] => [
  {
    id: uuidv4(),
    type: 'system',
    content: 'AI Terminal v1.0.0 - Type your questions below',
  },
];
