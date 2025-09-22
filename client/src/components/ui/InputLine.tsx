import React, { useRef, useState, useEffect } from 'react';
import './InputLine.css';
import {
  isValidCommand,
  getActualCommand,
  getCommandSuggestions,
  type CommandSuggestion,
} from '../../lib/commandUtils';
import { useCommandHistory } from '../../hooks/useCommandHistory';
import { useFocusManagement } from '../../hooks/useFocusManagement';
import { handleTextareaInput } from '../../lib/textareaUtils';
import CommandSuggestions from './CommandSuggestions';

interface InputLineProps {
  currentInput: string;
  setCurrentInput: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onCommand: (command: string) => void;
  isTyping: boolean;
  commandHistory: string[];
  setCommandHistory: (history: string[]) => void;
  onSuggestionsChange?: (showSuggestions: boolean) => void;
}

const InputLine: React.FC<InputLineProps> = ({
  currentInput,
  setCurrentInput,
  onKeyPress,
  onCommand,
  isTyping,
  commandHistory,
  setCommandHistory,
  onSuggestionsChange,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [suggestions, setSuggestions] = useState<CommandSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  // Update suggestions when input changes
  useEffect(() => {
    const newSuggestions = getCommandSuggestions(currentInput);
    const shouldShowSuggestions =
      newSuggestions.length > 0 && currentInput.trim() !== '';
    setSuggestions(newSuggestions);
    setShowSuggestions(shouldShowSuggestions);

    // Notify parent component when suggestions visibility changes
    if (onSuggestionsChange) {
      onSuggestionsChange(shouldShowSuggestions);
    }
  }, [currentInput, onSuggestionsChange]);

  if (isTyping) {
    return null;
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle escape key to hide suggestions
    if (e.key === 'Escape' && showSuggestions) {
      e.preventDefault();
      setShowSuggestions(false);
      return;
    }

    // Handle original key events
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
        if (trimmedInput.startsWith('set theme ')) {
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
  };

  return (
    <div className="input-container">
      <div className="input-line">
        <span className="user-prompt">user</span>
        <span className="prompt-separator">:</span>
        <span className="prompt-path">~</span>
        <span className="prompt-dollar">$ </span>
        <textarea
          ref={inputRef}
          value={currentInput}
          onChange={e => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
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
      <CommandSuggestions
        suggestions={suggestions}
        showSuggestions={showSuggestions}
      />
    </div>
  );
};

export default InputLine;
