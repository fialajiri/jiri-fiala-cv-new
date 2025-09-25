import React from 'react';
import './ThemeMessage.css';

interface ThemeMessageProps {
  themes: Array<{
    id: string;
    name: string;
  }>;
}

const ThemeMessage: React.FC<ThemeMessageProps> = ({ themes }) => {
  return (
    <div>
      <div className="theme-header-text">Available Themes:</div>

      <div className="theme-list">
        {themes.map(theme => (
          <div key={theme.id} className="theme-item">
            <div className="theme-name">{theme.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeMessage;
