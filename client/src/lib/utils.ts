export interface Message {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
}

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const createUserMessage = (content: string): Message => ({
  id: `user-${Date.now()}`,
  type: 'user',
  content: content.trim(),
  timestamp: new Date(),
});

export const createBotMessage = (): Message => ({
  id: `bot-${Date.now()}`,
  type: 'bot',
  content: '',
  timestamp: new Date(),
});

export const createSystemMessage = (content: string): Message => ({
  id: `system-${Date.now()}`,
  type: 'system',
  content,
  timestamp: new Date(),
});

export const getInitialMessages = (): Message[] => [
  {
    id: '1',
    type: 'system',
    content: 'AI Terminal v1.0.0 - Type your questions below',
    timestamp: new Date(),
  },
];
