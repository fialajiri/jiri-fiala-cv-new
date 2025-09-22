import React, { useRef } from 'react';
import './InputLine.css';
import { isValidCommand, getActualCommand } from '../../lib/commandUtils';
import { useCommandHistory } from '../../hooks/useCommandHistory';
import { useFocusManagement } from '../../hooks/useFocusManagement';
import { handleTextareaInput } from '../../lib/textareaUtils';

interface InputLineProps {
  currentInput: string;
  setCurrentInput: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onCommand: (command: string) => void;
  isTyping: boolean;
  commandHistory: string[];
  setCommandHistory: (history: string[]) => void;
}

const InputLine: React.FC<InputLineProps> = ({
  currentInput,
  setCurrentInput,
  onKeyPress,
  onCommand,
  isTyping,
  commandHistory,
  setCommandHistory,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { navigateHistory } = useCommandHistory({
    commandHistory,
    setCommandHistory,
    currentInput,
    setCurrentInput,
  });

  useFocusManagement({
    inputRef,
    isTyping,
  });

  if (isTyping) {
    return null;
  }

  return (
    <div className="input-line">
      <span className="user-prompt">user</span>
      <span className="prompt-separator">:</span>
      <span className="prompt-path">~</span>
      <span className="prompt-dollar">$ </span>
      <textarea
        ref={inputRef}
        value={currentInput}
        onChange={e => setCurrentInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateHistory('up');
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateHistory('down');
          } else if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const trimmedInput = currentInput.trim();

            if (trimmedInput && isValidCommand(trimmedInput)) {
              // For compound commands, pass the full command
              if (
                trimmedInput.startsWith('set theme ') ||
                trimmedInput.startsWith('ping ')
              ) {
                onCommand(trimmedInput);
              } else {
                const actualCommand = getActualCommand(trimmedInput);
                onCommand(actualCommand);
              }
            } else {
              onKeyPress(e as React.KeyboardEvent<HTMLTextAreaElement>);
            }
          } else if (e.key === 'c' && e.ctrlKey) {
            e.preventDefault();
            setCurrentInput('');
          }
        }}
        className="terminal-input"
        autoFocus
        rows={1}
        style={{
          resize: 'none',
          overflow: 'hidden',
          minHeight: '1.5em',
          maxHeight: '200px',
        }}
        onInput={handleTextareaInput}
      />
    </div>
  );
};

export default InputLine;
