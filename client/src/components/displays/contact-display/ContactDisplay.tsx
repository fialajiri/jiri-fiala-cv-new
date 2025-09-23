import React, { useCallback, memo } from 'react';
import './ContactDisplay.css';
import { useModifierKeys } from '../../../hooks/useModifierKeys';
import ContactItem, { type ContactItemData } from './ContactItem';
import contactData from '../data/contact-en.json';

const data = contactData as ContactData;

interface ContactData {
  name: string;
  occupation: string;
  contactItems: ContactItemData[];
}

const ContactDisplay: React.FC = () => {
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
    <div>
      <div className="contact-header">
        <div>Contact Information:</div>
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
