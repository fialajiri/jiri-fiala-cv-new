import React, { useRef, useEffect } from 'react';
import './InputLine.css';

interface InputLineProps {
  currentInput: string;
  setCurrentInput: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onCommand: (command: string) => void;
  isTyping: boolean;
}

const InputLine: React.FC<InputLineProps> = ({
  currentInput,
  setCurrentInput,
  onKeyPress,
  onCommand,
  isTyping,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Valid commands
  const validCommands = [
    'ls',
    'skills',
    'experience',
    'projects',
    'contact',
    'education',
    'download',
    'clear',
  ];

  // Check if input is a valid command
  const isCommand = (input: string): boolean => {
    const trimmedInput = input.trim().toLowerCase();
    return validCommands.includes(trimmedInput);
  };

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Focus input when clicking anywhere on terminal
  useEffect(() => {
    const handleClick = () => {
      if (!isTyping) {
        inputRef.current?.focus();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isTyping]);

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
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const trimmedInput = currentInput.trim();

            if (trimmedInput && isCommand(trimmedInput)) {
              // Handle command
              onCommand(trimmedInput.toLowerCase());
            } else {
              // Handle regular message
              onKeyPress(e as React.KeyboardEvent<HTMLTextAreaElement>);
            }
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
        onInput={e => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = 'auto';
          target.style.height = target.scrollHeight + 'px';
        }}
      />
    </div>
  );
};

export default InputLine;
