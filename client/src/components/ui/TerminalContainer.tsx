import React, { useRef, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import MatrixBackground from './MatrixBackground';
import { MessageList } from '../messages';
import InputLine from './InputLine';
import type { Message } from '../../lib/utils';
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
  onDownload?: (filename: string) => void;
  commandHistory: string[];
  setCommandHistory: (history: string[]) => void;
}

const TerminalContainer: React.FC<TerminalContainerProps> = ({
  messages,
  currentInput,
  setCurrentInput,
  onKeyPress,
  onCommand,
  isTyping,
  displayedContent,
  onDownload,
  commandHistory,
  setCommandHistory,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  // State for terminal size and position
  const [terminalSize, setTerminalSize] = useState({
    width: '70vw',
    height: '75vh',
  });
  const [terminalPosition, setTerminalPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: window.innerWidth * 0.15, // 15% of viewport width
    y: window.innerHeight * 0.125, // 12.5% of viewport height
  });

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

      {/* Resizable and Draggable Terminal Content */}
      <Rnd
        size={terminalSize}
        position={terminalPosition}
        onDragStop={(_, d) => {
          setTerminalPosition({ x: d.x, y: d.y });
        }}
        onResizeStop={(_, __, ref, ___, position) => {
          setTerminalSize({
            width: ref.style.width,
            height: ref.style.height,
          });
          setTerminalPosition({
            x: position.x,
            y: position.y,
          });
        }}
        minWidth={300}
        minHeight={200}
        maxWidth="90vw"
        maxHeight="90vh"
        dragHandleClassName="terminal-header"
        bounds="window"
        className="terminal-rnd"
      >
        <div className="terminal-header">
          <span className="terminal-prompt">jirifiala@personalpage:~$</span>
        </div>
        <div ref={terminalRef} className="terminal-content">
          <MessageList
            messages={messages}
            displayedContent={displayedContent}
            onDownload={onDownload}
          />

          {/* Current Input Line */}
          <InputLine
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            onKeyPress={onKeyPress}
            onCommand={onCommand}
            isTyping={isTyping}
            commandHistory={commandHistory}
            setCommandHistory={setCommandHistory}
          />
        </div>
      </Rnd>
    </div>
  );
};

export default TerminalContainer;
