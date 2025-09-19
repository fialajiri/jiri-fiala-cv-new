import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  loadContactData,
  loadEducationData,
  loadSkillsData,
  loadProjectsData,
  loadExperienceData,
} from '../lib/dataLoader';
import type { Message } from '../lib/utils';

interface UseCommandHandlerProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addBotMessage: () => Message;
  updateBotMessage: (id: string, content: string) => void;
  getInitialMessages: () => Message[];
}

export const useCommandHandler = ({
  setMessages,
  addBotMessage,
  updateBotMessage,
  getInitialMessages,
}: UseCommandHandlerProps) => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const handleCommand = async (command: string) => {
    if (!command.trim()) return;

    // Add command to history
    setCommandHistory(prev => [...prev, command]);

    // Handle different commands
    switch (command.toLowerCase()) {
      case 'ls': {
        const systemMessage: Message = {
          id: uuidv4(),
          type: 'system',
          content:
            'Available commands: s[k]ills · [p]rojects · e[x]perience · [c]ontact · [e]ducation · [d]ownload · clear',
        };
        setMessages(prev => [...prev, systemMessage]);
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
      case 'experience': {
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
      case 'clear':
        setMessages(getInitialMessages());
        break;
      default: {
        const botMessage = addBotMessage();
        updateBotMessage(
          botMessage.id,
          `Unknown command: ${command}. Type 'help' for available commands.`
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
