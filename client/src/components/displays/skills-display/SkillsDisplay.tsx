import React from 'react';
import './SkillsDisplay.css';
import skillsData from '../data/tech-skills-en.json';

const data = skillsData as SkillsData;

interface Skill {
  name: string;
}

interface SkillsData {
  title: string;
  skills: Skill[];
}

const SkillsDisplay: React.FC = () => {
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
