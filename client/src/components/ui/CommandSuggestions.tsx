import React from 'react';
import type { CommandSuggestion } from '../../lib/commandUtils';
import './CommandSuggestions.css';

interface CommandSuggestionsProps {
  suggestions: CommandSuggestion[];
  showSuggestions: boolean;
}

const CommandSuggestions: React.FC<CommandSuggestionsProps> = ({
  suggestions,
  showSuggestions,
}) => {
  if (!showSuggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="suggestions-container">
      <div className="suggestions-label">Suggestions:</div>
      <div className="suggestions-list">
        {suggestions.map(suggestion => (
          <div key={suggestion.command} className="suggestion-item">
            <span className="suggestion-command">{suggestion.command}</span>
            {suggestion.description && (
              <div>
                <span className="suggestion-separator"> - </span>
                <span className="suggestion-description">
                  {suggestion.description}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandSuggestions;
