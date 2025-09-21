import React from 'react';
import './ThemeMessage.css';

interface ThemeMessageProps {
  themes: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  currentTheme?: string;
}

const ThemeMessage: React.FC<ThemeMessageProps> = ({
  themes,
  currentTheme,
}) => {
  return (
    <div className="theme-message">
      <div className="theme-content">
        <div className="theme-header">
          <h3>Available Themes</h3>
          {currentTheme && (
            <div className="current-theme">
              Current: <span className="theme-name">{currentTheme}</span>
            </div>
          )}
        </div>

        <div className="theme-grid">
          {themes.map(theme => (
            <div
              key={theme.id}
              className={`theme-item ${currentTheme === theme.name ? 'active' : ''}`}
            >
              <div className="theme-name">{theme.name}</div>
              <div className="theme-description">{theme.description}</div>
            </div>
          ))}
        </div>

        <div className="theme-usage">
          <p>
            Usage: <code>set theme &lt;theme-name&gt;</code>
          </p>
          <p>
            Example: <code>set theme matrix</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemeMessage;
