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

  // Navigate command history
  const navigateHistory = useCallback(
    (direction: 'up' | 'down') => {
      if (commandHistory.length === 0) return;

      if (direction === 'up') {
        // Going up in history
        if (historyIndexRef.current === -1) {
          // First time going up, save current input
          tempInputRef.current = currentInput;
          historyIndexRef.current = commandHistory.length - 1;
        } else if (historyIndexRef.current > 0) {
          historyIndexRef.current--;
        }
      } else {
        // Going down in history
        if (historyIndexRef.current === -1) return;

        if (historyIndexRef.current === commandHistory.length - 1) {
          // At the end, restore original input
          setCurrentInput(tempInputRef.current);
          historyIndexRef.current = -1;
          return;
        } else {
          historyIndexRef.current++;
        }
      }

      // Set the input to the history item
      if (
        historyIndexRef.current >= 0 &&
        historyIndexRef.current < commandHistory.length
      ) {
        setCurrentInput(commandHistory[historyIndexRef.current]);
      }
    },
    [commandHistory, currentInput, setCurrentInput]
  );

  // Add command to history
  const addToHistory = useCallback(
    (command: string) => {
      const trimmedCommand = command.trim();
      if (trimmedCommand && !commandHistory.includes(trimmedCommand)) {
        setCommandHistory([...commandHistory, trimmedCommand]);
      }
      // Reset history navigation
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
