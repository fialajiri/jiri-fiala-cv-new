import React from 'react';
import './SkillsDisplay.css';

interface Skill {
  name: string;
  proficiency: number;
}

interface SkillsData {
  title: string;
  skills: Skill[];
}

interface SkillsDisplayProps {
  data: SkillsData;
}

const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ data }) => {
  const getProficiencyBar = (proficiency: number) => {
    const filledBars = Math.round(proficiency / 10);
    const emptyBars = 10 - filledBars;
    return '█'.repeat(filledBars) + '░'.repeat(emptyBars);
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 80) return '#00ff00';
    if (proficiency >= 60) return '#00aa00';
    if (proficiency >= 40) return '#ffff00';
    return '#ff6600';
  };

  return (
    <div className="skills-display">
      <h3>== {data.title} ==</h3>

      <div className="skills-grid">
        {data.skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-name">{skill.name}</div>
            <div className="skill-proficiency">
              <div
                className="proficiency-bar"
                style={{ color: getProficiencyColor(skill.proficiency) }}
              >
                {getProficiencyBar(skill.proficiency)}
              </div>
              <div className="proficiency-percentage">{skill.proficiency}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsDisplay;
