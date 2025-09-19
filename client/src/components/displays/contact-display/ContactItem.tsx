import React, { useCallback, memo } from 'react';
import ClickableUrl from '../../ui/ClickableUrl';
import './ContactItem.css';
import { formatUrl } from '../../../lib/utils';

export interface ContactItemData {
  icon: string;
  text: string;
  type?: string;
  link: {
    type: 'email' | 'phone' | 'link';
    url: string;
  };
}

interface ContactItemProps {
  item: ContactItemData;
  isModifierPressed: boolean;
  onUrlClick: (url: string, event: React.MouseEvent) => void;
  onFollowLinkClick: (url: string) => void;
}

const ContactItem: React.FC<ContactItemProps> = memo(
  ({ item, isModifierPressed, onUrlClick, onFollowLinkClick }) => {
    const actualUrl = formatUrl(item.link.type, item.link.url);

    const handleUrlClick = useCallback(
      (_: string, event: React.MouseEvent) => {
        onUrlClick(actualUrl, event);
      },
      [actualUrl, onUrlClick]
    );

    const handleFollowLinkClick = useCallback(() => {
      onFollowLinkClick(actualUrl);
    }, [actualUrl, onFollowLinkClick]);

    return (
      <div className="contact-item">
        <img
          src={item.icon}
          alt={item.type || 'icon'}
          className="contact-icon"
        />
        <ClickableUrl
          url={item.text}
          label=""
          isModifierPressed={isModifierPressed}
          onUrlClick={handleUrlClick}
          onFollowLinkClick={handleFollowLinkClick}
        />
      </div>
    );
  }
);

ContactItem.displayName = 'ContactItem';

export default ContactItem;
