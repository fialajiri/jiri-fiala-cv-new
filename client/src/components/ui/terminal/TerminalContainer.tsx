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
  streamingMessageId,
  onDownload,
  commandHistory,
  setCommandHistory,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const {
    handleDragStop,
    handleResizeStop,
    terminalSize,
    terminalPosition,
    setTerminalSize,
    setTerminalPosition,
    isMobile,
  } = useTerminalResize();

  const { isMaximized, handleMaximize } = useTerminalMaximize(
    terminalSize,
    terminalPosition,
    setTerminalSize,
    setTerminalPosition,
    isMobile
  );

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentInput, isTyping, displayedContent, streamingMessageId]);

  const handleSuggestionsChange = (showSuggestions: boolean) => {
    if (showSuggestions) {
      // Use setTimeout to ensure the suggestions are rendered before scrolling
      setTimeout(() => {
        scrollToBottom();
      }, 10);
    }
  };

  const handleInputStateChange = (isActive: boolean) => {
    setIsInputDisabled(!isActive);
  };

  return (
    <div className="terminal-container">
      <MatrixBackground />

      <Rnd
        size={terminalSize}
        position={terminalPosition}
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        minWidth={isMobile ? '100vw' : 300}
        minHeight={isMobile ? '100vh' : 200}
        maxWidth={isMobile ? '100vw' : isMaximized ? '100vw' : '90vw'}
        maxHeight={isMobile ? '100vh' : isMaximized ? '100vh' : '90vh'}
        dragHandleClassName={isMobile ? undefined : 'terminal-header'}
        bounds={isMobile ? 'parent' : 'window'}
        className="terminal-rnd"
        disableDragging={isMobile}
        enableResizing={!isMobile}
      >
        <TerminalHeader
          isMaximized={isMaximized}
          onMaximize={handleMaximize}
          isMobile={isMobile}
        />
        <div ref={terminalRef} className="terminal-content">
          <MessageList
            messages={messages}
            displayedContent={displayedContent}
            onDownload={onDownload}
            onInputStateChange={handleInputStateChange}
          />

          {!isInputDisabled && (
            <InputLine
              currentInput={currentInput}
              setCurrentInput={setCurrentInput}
              onKeyPress={onKeyPress}
              onCommand={onCommand}
              isTyping={isTyping}
              commandHistory={commandHistory}
              setCommandHistory={setCommandHistory}
              onSuggestionsChange={handleSuggestionsChange}
            />
          )}
        </div>
      </Rnd>
    </div>
  );
};

export default TerminalContainer;
