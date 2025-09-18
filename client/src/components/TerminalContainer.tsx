import React, { useRef, useEffect } from 'react';
import MatrixBackground from './MatrixBackground';
import MessageList from './MessageList';
import InputLine from './InputLine';
import type { Message } from '../lib/utils';
import './TerminalContainer.css';

interface TerminalContainerProps {
  messages: Message[];
  currentInput: string;
  setCurrentInput: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onCommand: (command: string) => void;
  isTyping: boolean;
  displayedContent: Record<string, string>;
  streamingMessageId: string | null;
  isTypingAnimationComplete: boolean;
}

const TerminalContainer: React.FC<TerminalContainerProps> = ({
  messages,
  currentInput,
  setCurrentInput,
  onKeyPress,
  onCommand,
  isTyping,
  displayedContent,
  isTypingAnimationComplete,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages, currentInput, isTyping]);

  return (
    <div className="terminal-container">
      {/* Matrix Background */}
      <MatrixBackground />

      {/* Terminal Content */}
      <div ref={terminalRef} className="terminal-content">
        <MessageList messages={messages} displayedContent={displayedContent} />

        {/* Current Input Line */}
        <InputLine
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
          onKeyPress={onKeyPress}
          onCommand={onCommand}
          isTyping={isTyping}
          isTypingAnimationComplete={isTypingAnimationComplete}
        />
      </div>
    </div>
  );
};

export default TerminalContainer;
