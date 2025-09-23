import React, { memo } from 'react';
import './AboutDisplay.css';
import profileData from '../data/profile-en.json';

const data = profileData as AboutData;

interface AboutData {
  title: string;
  icon: string;
  bio: string;
}

const AboutDisplay: React.FC = () => {
  return (
    <div className="about-display">
      <div className="about-content">
        <div className="about-bio">{data.bio}</div>
      </div>
    </div>
  );
};

export default memo(AboutDisplay);
