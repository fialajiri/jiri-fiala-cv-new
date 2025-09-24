import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  getAvailableThemes,
  getThemeByName,
  switchTheme,
} from '../lib/themeUtils';
import type { Message } from '../lib/utils';

interface UseCommandHandlerProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addBotMessage: () => Message;
  updateBotMessage: (id: string, content: string) => void;
  getInitialMessages: () => Message[];
  currentTheme?: string | null;
}

export const useCommandHandler = ({
  setMessages,
  addBotMessage,
  updateBotMessage,
  getInitialMessages,
  currentTheme,
}: UseCommandHandlerProps) => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const handleCommand = async (command: string) => {
    if (!command.trim()) return;

    setCommandHistory(prev => [...prev, command]);

    switch (command.toLowerCase()) {
      case 'ls': {
        const lsMessage: Message = {
          id: uuidv4(),
          type: 'ls',
          content: '',
        };
        setMessages(prev => [...prev, lsMessage]);
        break;
      }
      case 'skills': {
        const componentMessage: Message = {
          id: uuidv4(),
          type: 'component',
          content: '',
          componentType: 'skills',
        };
        setMessages(prev => [...prev, componentMessage]);

        break;
      }
      case 'work': {
        const componentMessage: Message = {
          id: uuidv4(),
          type: 'component',
          content: '',
          componentType: 'experience',
        };
        setMessages(prev => [...prev, componentMessage]);

        break;
      }
      case 'projects': {
        const componentMessage: Message = {
          id: uuidv4(),
          type: 'component',
          content: '',
          componentType: 'projects',
        };
        setMessages(prev => [...prev, componentMessage]);

        break;
      }
      case 'contact': {
        const componentMessage: Message = {
          id: uuidv4(),
          type: 'component',
          content: '',
          componentType: 'contact',
        };
        setMessages(prev => [...prev, componentMessage]);

        break;
      }
      case 'download': {
        const componentMessage: Message = {
          id: uuidv4(),
          type: 'component',
          content: '',
          componentType: 'cv-download',
        };
        setMessages(prev => [...prev, componentMessage]);
        break;
      }
      case 'education': {
        const componentMessage: Message = {
          id: uuidv4(),
          type: 'component',
          content: '',
          componentType: 'education',
        };
        setMessages(prev => [...prev, componentMessage]);

        break;
      }
      case 'about': {
        const componentMessage: Message = {
          id: uuidv4(),
          type: 'component',
          content: '',
          componentType: 'about',
        };
        setMessages(prev => [...prev, componentMessage]);

        break;
      }
      case 'date': {
        const now = new Date();
        const dateMessage: Message = {
          id: uuidv4(),
          type: 'plain',
          content: now.toString(),
        };
        setMessages(prev => [...prev, dateMessage]);
        break;
      }
      case 'history': {
        const historyMessage: Message = {
          id: uuidv4(),
          type: 'history',
          content:
            commandHistory.length > 0
              ? commandHistory
                  .map((cmd, index) => `${index + 1}  ${cmd}`)
                  .join('\n')
              : '',
        };
        setMessages(prev => [...prev, historyMessage]);
        break;
      }
      case 'clear':
        setMessages(getInitialMessages());
        break;
      case 'theme': {
        const themes = getAvailableThemes();
        const themeMessage: Message = {
          id: uuidv4(),
          type: 'theme',
          content: currentTheme || 'dark', // Current theme name
          componentData: themes.map(theme => ({
            id: theme.id,
            name: theme.name,
            description: theme.description,
          })),
        };
        setMessages(prev => [...prev, themeMessage]);
        break;
      }
      default: {
        // Handle compound commands that don't match exact cases
        // Handle 'set theme <name>' command
        if (command.toLowerCase().startsWith('set theme ')) {
          const themeName = command.substring(10).trim();
          const theme = getThemeByName(themeName);

          if (theme) {
            const switchedTheme = switchTheme(theme.id);
            if (switchedTheme) {
              const successMessage: Message = {
                id: uuidv4(),
                type: 'plain',
                content: `Theme changed to: ${switchedTheme.name}`,
              };
              setMessages(prev => [...prev, successMessage]);
            } else {
              const errorMessage = addBotMessage();
              updateBotMessage(
                errorMessage.id,
                `Failed to switch to theme: ${themeName}`
              );
            }
          } else {
            const errorMessage = addBotMessage();
            updateBotMessage(
              errorMessage.id,
              `Theme not found: ${themeName}. Type 'theme' to see available themes.`
            );
          }
          break;
        }
        const botMessage = addBotMessage();
        updateBotMessage(
          botMessage.id,
          `Unknown command: ${command}. Type 'ls' for available commands.`
        );
      }
    }
  };

  return {
    commandHistory,
    setCommandHistory,
    handleCommand,
  };
};
