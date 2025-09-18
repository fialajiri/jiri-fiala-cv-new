import { v4 as uuidv4 } from 'uuid';
import type { ReactNode } from 'react';

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
    | 'experience'
    | 'cv-download';
  componentData?: unknown;
}

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
};

export const getInitialMessages = (): Message[] => [
  {
    id: uuidv4(),
    type: 'system',
    content:
      'Type your questions below or type "ls" to list available commands',
  },
];
