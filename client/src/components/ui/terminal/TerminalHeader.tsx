import React, { memo } from 'react';
import './TerminalHeader.css';

interface TerminalHeaderProps {
  isMaximized: boolean;
  onMaximize: () => void;
  isMobile?: boolean;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = memo(
  ({ isMaximized, onMaximize, isMobile = false }) => (
    <div
      className="terminal-header"
      onDoubleClick={!isMobile ? onMaximize : undefined}
    >
      <span className="terminal-prompt">jirifiala@personalpage:~$</span>
      {!isMobile && (
        <button
          className={`maximize-btn ${isMaximized ? 'maximized' : ''}`}
          onClick={onMaximize}
          title={isMaximized ? 'Restore' : 'Maximize'}
        />
      )}
    </div>
  )
);

TerminalHeader.displayName = 'TerminalHeader';

export default TerminalHeader;
