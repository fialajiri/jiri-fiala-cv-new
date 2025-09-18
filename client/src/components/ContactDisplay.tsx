import React from 'react';
import './ContactDisplay.css';

interface ContactItem {
  icon: string;
  text: string;
  type?: string;
  link: {
    type: string;
    url: string;
  };
}

interface ContactData {
  name: string;
  occupation: string;
  contactItems: ContactItem[];
}

interface ContactDisplayProps {
  data: ContactData;
}

const ContactDisplay: React.FC<ContactDisplayProps> = ({ data }) => {
  return (
    <div className="contact-display">
      <div className="contact-header">
        <h3>== Contact Information ==</h3>
        <div className="contact-name">{data.name}</div>
        <div className="contact-occupation">{data.occupation}</div>
      </div>

      <div className="contact-items">
        {data.contactItems.map((item, index) => (
          <div key={index} className="contact-item">
            <span className="contact-icon">📧</span>
            <span className="contact-text">{item.text}</span>
            {item.link.type === 'email' && (
              <span className="contact-link">→ {item.link.url}</span>
            )}
            {item.link.type === 'phone' && (
              <span className="contact-link">→ {item.link.url}</span>
            )}
            {item.link.type === 'link' && (
              <span className="contact-link">→ {item.link.url}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDisplay;
