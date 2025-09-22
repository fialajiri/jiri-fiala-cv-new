import { useRef, useCallback } from 'react';

interface UseCommandHistoryProps {
  commandHistory: string[];
  setCommandHistory: (history: string[]) => void;
  currentInput: string;
  setCurrentInput: (input: string) => void;
}

export const useCommandHistory = ({
  commandHistory,
  setCommandHistory,
  currentInput,
  setCurrentInput,
}: UseCommandHistoryProps) => {
  const historyIndexRef = useRef<number>(-1);
  const tempInputRef = useRef<string>('');

  const navigateHistory = useCallback(
    (direction: 'up' | 'down') => {
      if (commandHistory.length === 0) return;

      if (direction === 'up') {
        if (historyIndexRef.current === -1) {
          // Starting navigation - save current input and go to latest command
          tempInputRef.current = currentInput;
          historyIndexRef.current = commandHistory.length - 1;
          setCurrentInput(commandHistory[commandHistory.length - 1]);
        } else if (historyIndexRef.current > 0) {
          // Go to previous command in history
          historyIndexRef.current = historyIndexRef.current - 1;
          setCurrentInput(commandHistory[historyIndexRef.current]);
        }
      } else {
        if (historyIndexRef.current === -1) {
          // Down arrow pressed without previous up navigation - do nothing
          return;
        }

        if (historyIndexRef.current < commandHistory.length - 1) {
          // Go to next command in history
          historyIndexRef.current = historyIndexRef.current + 1;
          setCurrentInput(commandHistory[historyIndexRef.current]);
        } else {
          // We're at the latest command, go back to original input
          setCurrentInput(tempInputRef.current);
          historyIndexRef.current = -1;
          tempInputRef.current = '';
        }
      }
    },
    [commandHistory, currentInput, setCurrentInput]
  );

  const addToHistory = useCallback(
    (command: string) => {
      const trimmedCommand = command.trim();
      if (trimmedCommand && !commandHistory.includes(trimmedCommand)) {
        setCommandHistory([...commandHistory, trimmedCommand]);
      }

      historyIndexRef.current = -1;
      tempInputRef.current = '';
    },
    [commandHistory, setCommandHistory]
  );

  return {
    navigateHistory,
    addToHistory,
  };
};
