import React, { useRef, useEffect } from 'react';
import './InputLine.css';

interface InputLineProps {
  currentInput: string;
  setCurrentInput: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isTyping: boolean;
  isTypingAnimationComplete: boolean;
}

const InputLine: React.FC<InputLineProps> = ({
  currentInput,
  setCurrentInput,
  onKeyPress,
  isTyping,
  isTypingAnimationComplete,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Focus input when clicking anywhere on terminal
  useEffect(() => {
    const handleClick = () => {
      if (!isTyping && isTypingAnimationComplete) {
        inputRef.current?.focus();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isTyping, isTypingAnimationComplete]);

  if (isTyping || !isTypingAnimationComplete) {
    return null;
  }

  return (
    <div className="input-line">
      <span className="user-prompt">user@terminal</span>
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
            onKeyPress(e as React.KeyboardEvent<HTMLTextAreaElement>);
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
