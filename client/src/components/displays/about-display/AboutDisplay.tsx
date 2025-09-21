import React, { memo } from 'react';
import './AboutDisplay.css';

interface AboutData {
  title: string;
  icon: string;
  bio: string;
}

interface AboutDisplayProps {
  data: AboutData;
}

const AboutDisplay: React.FC<AboutDisplayProps> = ({ data }) => {
  return (
    <div className="about-display">
      <div className="about-content">
        <div className="about-bio">{data.bio}</div>
      </div>
    </div>
  );
};

export default memo(AboutDisplay);
