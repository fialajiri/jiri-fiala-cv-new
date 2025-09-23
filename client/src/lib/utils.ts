import { v4 as uuidv4 } from 'uuid';
import type { ReactNode } from 'react';
import { URL_PREFIXES } from './constants/contact';

export interface Message {
  id: string;
  type:
    | 'user'
    | 'bot'
    | 'system'
    | 'component'
    | 'history'
    | 'ls'
    | 'theme'
    | 'plain';

  content: string;
  component?: ReactNode;
  componentType?:
    | 'contact'
    | 'education'
    | 'skills'
    | 'projects'
    | 'experience'
    | 'cv-download'
    | 'about';
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

export const formatUrl = (
  linkType: 'email' | 'phone' | 'link',
  url: string
): string => {
  const prefix = URL_PREFIXES[linkType] || '';
  return `${prefix}${url}`;
};
