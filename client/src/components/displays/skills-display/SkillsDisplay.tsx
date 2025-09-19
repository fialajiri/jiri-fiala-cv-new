import React from 'react';
import './SkillsDisplay.css';

interface Skill {
  name: string;
}

interface SkillsData {
  title: string;
  skills: Skill[];
}

interface SkillsDisplayProps {
  data: SkillsData;
}

const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ data }) => {
  return (
    <div className="skills-display">
      <h3>== {data.title} ==</h3>

      <div className="skills-grid">
        {data.skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-name">{skill.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsDisplay;
