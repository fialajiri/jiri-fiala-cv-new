import React, { useRef, useEffect } from 'react';
import './InputLine.css';

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
  const historyIndexRef = useRef<number>(-1);
  const tempInputRef = useRef<string>('');

  // Valid commands
  const validCommands = [
    'ls',
    'skills',
    'k', // shortcut for skills
    'experience',
    'x', // shortcut for experience
    'projects',
    'p', // shortcut for projects
    'contact',
    'c', // shortcut for contact
    'education',
    'e', // shortcut for education
    'download',
    'd', // shortcut for download
    'clear',
  ];

  // Command mapping for shortcuts
  const commandMap: { [key: string]: string } = {
    k: 'skills',
    x: 'experience',
    p: 'projects',
    c: 'contact',
    e: 'education',
    d: 'download',
  };

  // Check if input is a valid command
  const isCommand = (input: string): boolean => {
    const trimmedInput = input.trim().toLowerCase();
    return validCommands.includes(trimmedInput);
  };

  // Get the actual command (resolve shortcuts)
  const getActualCommand = (input: string): string => {
    const trimmedInput = input.trim().toLowerCase();
    return commandMap[trimmedInput] || trimmedInput;
  };

  // Navigate command history
  const navigateHistory = (direction: 'up' | 'down') => {
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
  };

  // Add command to history
  const addToHistory = (command: string) => {
    const trimmedCommand = command.trim();
    if (trimmedCommand && !commandHistory.includes(trimmedCommand)) {
      setCommandHistory([...commandHistory, trimmedCommand]);
    }
    // Reset history navigation
    historyIndexRef.current = -1;
    tempInputRef.current = '';
  };

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Focus input when clicking anywhere on terminal, but not when selecting text
  useEffect(() => {
    let isSelecting = false;

    const handleMouseDown = () => {
      // Reset selection state on mouse down
      isSelecting = false;
    };

    const handleMouseMove = () => {
      // If mouse moves while button is down, user is likely selecting
      if (window.getSelection()?.toString()) {
        isSelecting = true;
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!isTyping && !isSelecting) {
        // Don't focus if clicking on selectable elements
        const target = e.target as HTMLElement;
        if (
          target &&
          (target.tagName === 'A' ||
            target.tagName === 'BUTTON' ||
            target.closest('a') ||
            target.closest('button') ||
            target.closest('[role="button"]'))
        ) {
          return;
        }

        // Check if there's any text selected after the click
        setTimeout(() => {
          const selection = window.getSelection();
          if (!selection || selection.toString().length === 0) {
            inputRef.current?.focus();
          }
        }, 0);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
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
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateHistory('up');
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateHistory('down');
          } else if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const trimmedInput = currentInput.trim();

            if (trimmedInput && isCommand(trimmedInput)) {
              const actualCommand = getActualCommand(trimmedInput);
              addToHistory(actualCommand);
              onCommand(actualCommand);
            } else {
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
