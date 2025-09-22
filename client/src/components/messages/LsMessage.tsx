import React from 'react';
import type { Message } from '../../lib/utils';
import './LsMessage.css';

interface LsMessageProps {
  message: Message;
}

interface CommandData {
  profileCommands: Array<{
    name: string;
    description: string;
    shortcut?: string;
  }>;
  systemCommands: Array<{
    name: string;
    description: string;
    shortcut?: string;
  }>;
}

const LsMessage: React.FC<LsMessageProps> = () => {
  const data: CommandData = {
    profileCommands: [
      { name: '[a]bout', description: 'Personal profile and bio' },
      {
        name: '[w]ork',
        description: 'Work experience and career history',
      },
      {
        name: '[p]rojects',
        description: 'Show portfolio projects',
      },
      {
        name: '[e]ducation',
        description: 'Educational background',
      },
      {
        name: '[s]kills',
        description: 'Display technical skills',
      },
      {
        name: '[c]ontact',
        description: 'Contact information and links',
      },

      { name: '[d]ownload', description: 'Download CV/resume' },
    ],
    systemCommands: [
      { name: 'ls', description: 'List available commands' },
      { name: 'history', description: 'Show command history' },
      { name: 'date', description: 'Display current date and time' },
      { name: 'clear', description: 'Clear terminal screen' },
      { name: 'theme', description: 'List available themes' },
      { name: 'set theme <name>', description: 'Switch to a specific theme' },
      { name: 'ping', description: 'Ping the server' },
      { name: 'sysinfo', description: 'Display system information' },
    ],
  };

  return (
    <div className="ls-message">
      <div className="ls-content">
        <div className="ls-column">
          <div className="ls-section-title">Profile Commands:</div>
          {data.profileCommands.map((cmd, index) => (
            <div key={index} className="ls-command-row">
              <span className="ls-command-name">{cmd.name}</span>
              <span className="ls-command-desc">{cmd.description}</span>
            </div>
          ))}
        </div>

        <div className="ls-column">
          <div className="ls-section-title">System Commands:</div>
          {data.systemCommands.map((cmd, index) => (
            <div key={index} className="ls-command-row">
              <span className="ls-command-name">{cmd.name}</span>
              <span className="ls-command-desc">{cmd.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LsMessage;
