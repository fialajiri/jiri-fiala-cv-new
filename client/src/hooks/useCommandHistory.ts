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
          tempInputRef.current = currentInput;
        }
        historyIndexRef.current =
          (historyIndexRef.current - 1 + commandHistory.length) %
          commandHistory.length;
        setCurrentInput(commandHistory[historyIndexRef.current]);
      } else {
        if (historyIndexRef.current === -1) {
          tempInputRef.current = currentInput;
          historyIndexRef.current = 0;
          setCurrentInput(commandHistory[0]);
          return;
        }
        historyIndexRef.current =
          (historyIndexRef.current + 1) % commandHistory.length;

        if (historyIndexRef.current === 0) {
          setCurrentInput(tempInputRef.current);
          historyIndexRef.current = -1;
          return;
        }

        setCurrentInput(commandHistory[historyIndexRef.current]);
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
