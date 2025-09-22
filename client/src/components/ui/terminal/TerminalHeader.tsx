import React, { memo } from 'react';
import './TerminalHeader.css';

interface TerminalHeaderProps {
  isMaximized: boolean;
  onMaximize: () => void;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = memo(
  ({ isMaximized, onMaximize }) => (
    <div className="terminal-header" onDoubleClick={onMaximize}>
      <span className="terminal-prompt">jirifiala@personalpage:~$</span>
      <button
        className={`maximize-btn ${isMaximized ? 'maximized' : ''}`}
        onClick={onMaximize}
        title={isMaximized ? 'Restore' : 'Maximize'}
      />
    </div>
  )
);

TerminalHeader.displayName = 'TerminalHeader';

export default TerminalHeader;
