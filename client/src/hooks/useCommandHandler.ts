import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  loadContactData,
  loadEducationData,
  loadSkillsData,
  loadProjectsData,
  loadExperienceData,
  loadProfileData,
} from '../lib/dataLoader';
import {
  getAvailableThemes,
  getThemeByName,
  switchTheme,
} from '../lib/themeUtils';
import { api } from '../lib/api-client';
import { extractPingUrl, isValidUrl } from '../lib/commandUtils';
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
        try {
          const data = await loadSkillsData();
          const componentMessage: Message = {
            id: uuidv4(),
            type: 'component',
            content: '',
            componentType: 'skills',
            componentData: data,
          };
          setMessages(prev => [...prev, componentMessage]);
        } catch {
          const errorMessage = addBotMessage();
          updateBotMessage(
            errorMessage.id,
            'Error loading skills data. Please try again.'
          );
        }
        break;
      }
      case 'work': {
        try {
          const data = await loadExperienceData();
          const componentMessage: Message = {
            id: uuidv4(),
            type: 'component',
            content: '',
            componentType: 'experience',
            componentData: data,
          };
          setMessages(prev => [...prev, componentMessage]);
        } catch {
          const errorMessage = addBotMessage();
          updateBotMessage(
            errorMessage.id,
            'Error loading experience data. Please try again.'
          );
        }
        break;
      }
      case 'projects': {
        try {
          const data = await loadProjectsData();
          const componentMessage: Message = {
            id: uuidv4(),
            type: 'component',
            content: '',
            componentType: 'projects',
            componentData: data,
          };
          setMessages(prev => [...prev, componentMessage]);
        } catch {
          const errorMessage = addBotMessage();
          updateBotMessage(
            errorMessage.id,
            'Error loading projects data. Please try again.'
          );
        }
        break;
      }
      case 'contact': {
        try {
          const data = await loadContactData();
          const componentMessage: Message = {
            id: uuidv4(),
            type: 'component',
            content: '',
            componentType: 'contact',
            componentData: data,
          };
          setMessages(prev => [...prev, componentMessage]);
        } catch {
          const errorMessage = addBotMessage();
          updateBotMessage(
            errorMessage.id,
            'Error loading contact data. Please try again.'
          );
        }
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
        try {
          const data = await loadEducationData();
          const componentMessage: Message = {
            id: uuidv4(),
            type: 'component',
            content: '',
            componentType: 'education',
            componentData: data,
          };
          setMessages(prev => [...prev, componentMessage]);
        } catch {
          const errorMessage = addBotMessage();
          updateBotMessage(
            errorMessage.id,
            'Error loading education data. Please try again.'
          );
        }
        break;
      }
      case 'about': {
        try {
          const data = await loadProfileData();
          const componentMessage: Message = {
            id: uuidv4(),
            type: 'component',
            content: '',
            componentType: 'about',
            componentData: data,
          };
          setMessages(prev => [...prev, componentMessage]);
        } catch {
          const errorMessage = addBotMessage();
          updateBotMessage(
            errorMessage.id,
            'Error loading profile data. Please try again.'
          );
        }
        break;
      }
      case 'date': {
        const now = new Date();
        const dateMessage: Message = {
          id: uuidv4(),
          type: 'system',
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
      case 'sysinfo': {
        try {
          const ipData = await api.getSystemInfo();
          const sysinfoMessage: Message = {
            id: uuidv4(),
            type: 'sysinfo',
            content: '',
            componentData: ipData,
          };
          setMessages(prev => [...prev, sysinfoMessage]);
        } catch {
          const errorMessage = addBotMessage();
          updateBotMessage(
            errorMessage.id,
            'Error fetching system information. Please try again.'
          );
        }
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
                type: 'system',
                content: `Theme switched to: ${switchedTheme.name}`,
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

        // Handle 'ping <url>' command
        if (command.toLowerCase().startsWith('ping ')) {
          const url = extractPingUrl(command);
          if (!url) {
            const errorMessage = addBotMessage();
            updateBotMessage(
              errorMessage.id,
              'Usage: ping <url>\nExample: ping google.com or ping https://google.com'
            );
            break;
          }

          if (!isValidUrl(url)) {
            const errorMessage = addBotMessage();
            updateBotMessage(
              errorMessage.id,
              `Invalid URL: ${url}\nPlease provide a valid URL (e.g., google.com or https://google.com)`
            );
            break;
          }

          try {
            const pingResult = await api.ping(url);

            const pingMessage: Message = {
              id: uuidv4(),
              type: 'system',
              content: `Ping to ${pingResult.url}: ${pingResult.time.toFixed(2)} ms`,
            };
            setMessages(prev => [...prev, pingMessage]);
          } catch {
            const errorMessage = addBotMessage();
            updateBotMessage(
              errorMessage.id,
              'Error pinging the URL. Please try again.'
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
