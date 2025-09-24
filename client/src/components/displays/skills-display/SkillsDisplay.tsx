import React from 'react';
import './SkillsDisplay.css';
import skillsData from '../data/tech-skills-en.json';

const data = skillsData as SkillsData;

interface SkillCategory {
  name: string;
  items: string[];
}

interface SkillsData {
  title: string;
  categories: SkillCategory[];
}

const SkillsDisplay: React.FC = () => {
  return (
    <div className="skills-display">
      <div className="skills-display-title">{data.title}:</div>

      <div className="skills-grid">
        {data.categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="skill-category">
            <div className="category-name">{category.name}:</div>
            <div className="category-items">
              {category.items.map((item, itemIndex) => (
                <span key={itemIndex} className="skill-item">
                  {item}
                  {itemIndex < category.items.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsDisplay;
