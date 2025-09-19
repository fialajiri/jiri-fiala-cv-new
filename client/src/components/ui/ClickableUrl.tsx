import React, { memo } from 'react';
import './ClickableUrl.css';

interface ClickableUrlProps {
  url: string;
  label: string;
  isModifierPressed: boolean;
  onUrlClick: (url: string, event: React.MouseEvent) => void;
  onFollowLinkClick: (url: string) => void;
}

const ClickableUrl: React.FC<ClickableUrlProps> = ({
  url,
  label,
  isModifierPressed,
  onUrlClick,
  onFollowLinkClick,
}) => {
  return (
    <div className="project-url">
      <span className="url-label">{label}:</span>
      <div className="url-container">
        <span
          className={`clickable-url ${isModifierPressed ? 'modifier-pressed' : ''}`}
          onClick={e => onUrlClick(url, e)}
        >
          {url}
        </span>
        <div className="follow-link-tooltip">
          <span
            className="follow-link-text"
            onClick={() => onFollowLinkClick(url)}
          >
            Follow link
          </span>
          <span className="follow-link-hint"> (cmd + click)</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ClickableUrl);
