import React, { useCallback, memo } from 'react';
import './ContactDisplay.css';
import { useModifierKeys } from '../../../hooks/useModifierKeys';
import ContactItem, { type ContactItemData } from './ContactItem';

interface ContactData {
  name: string;
  occupation: string;
  contactItems: ContactItemData[];
}

interface ContactDisplayProps {
  data: ContactData;
}

const ContactDisplay: React.FC<ContactDisplayProps> = ({ data }) => {
  const isModifierPressed = useModifierKeys();

  const handleUrlClick = useCallback((url: string, event: React.MouseEvent) => {
    if (event.metaKey || event.ctrlKey) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const handleFollowLinkClick = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div className="contact-display">
      <div className="contact-header">
        <h3>== Contact Information ==</h3>
      </div>

      <div className="contact-items">
        {data.contactItems.map((item, index) => (
          <ContactItem
            key={`${item.text}-${index}`}
            item={item}
            isModifierPressed={isModifierPressed}
            onUrlClick={handleUrlClick}
            onFollowLinkClick={handleFollowLinkClick}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(ContactDisplay);
