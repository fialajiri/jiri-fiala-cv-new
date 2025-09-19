import React, { useRef, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import MatrixBackground from '../MatrixBackground';
import { MessageList } from '../../messages';
import InputLine from '../InputLine';
import TerminalHeader from './TerminalHeader';
import type { Message } from '../../../lib/utils';
import './TerminalContainer.css';
import { useTerminalResize } from '../../../hooks/useTerminalResize';
import { useTerminalMaximize } from '../../../hooks/useTerminalMaximize';

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
  const [isCVDownloadActive, setIsCVDownloadActive] = useState(false);

  const {
    handleDragStop,
    handleResizeStop,
    terminalSize,
    terminalPosition,
    setTerminalSize,
    setTerminalPosition,
  } = useTerminalResize();

  const { isMaximized, handleMaximize } = useTerminalMaximize(
    terminalSize,
    terminalPosition,
    setTerminalSize,
    setTerminalPosition
  );

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages, currentInput, isTyping]);

  // Check if CVDownloadDisplay is active and incomplete
  useEffect(() => {
    const hasActiveCVDownload = messages.some(
      message =>
        message.type === 'component' && message.componentType === 'cv-download'
    );
    setIsCVDownloadActive(hasActiveCVDownload);
  }, [messages]);

  const handleSelectionComplete = () => {
    setIsCVDownloadActive(false);
  };

  return (
    <div className="terminal-container">
      <MatrixBackground />

      <Rnd
        size={terminalSize}
        position={terminalPosition}
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        minWidth={300}
        minHeight={200}
        maxWidth={isMaximized ? '100vw' : '90vw'}
        maxHeight={isMaximized ? '100vh' : '90vh'}
        dragHandleClassName="terminal-header"
        bounds="window"
        className="terminal-rnd"
      >
        <TerminalHeader isMaximized={isMaximized} onMaximize={handleMaximize} />
        <div ref={terminalRef} className="terminal-content">
          <MessageList
            messages={messages}
            displayedContent={displayedContent}
            onDownload={onDownload}
            onSelectionComplete={handleSelectionComplete}
          />

          {!isCVDownloadActive && (
            <InputLine
              currentInput={currentInput}
              setCurrentInput={setCurrentInput}
              onKeyPress={onKeyPress}
              onCommand={onCommand}
              isTyping={isTyping}
              commandHistory={commandHistory}
              setCommandHistory={setCommandHistory}
            />
          )}
        </div>
      </Rnd>
    </div>
  );
};

export default TerminalContainer;
