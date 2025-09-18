import React from 'react';
import {
  ContactDisplay,
  EducationDisplay,
  SkillsDisplay,
  ProjectsDisplay,
  ExperienceDisplay,
} from './';

interface DataDisplayProps {
  type: 'contact' | 'education' | 'skills' | 'projects' | 'experience';
  data: any;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ type, data }) => {
  switch (type) {
    case 'contact':
      return <ContactDisplay data={data} />;
    case 'education':
      return <EducationDisplay data={data} />;
    case 'skills':
      return <SkillsDisplay data={data} />;
    case 'projects':
      return <ProjectsDisplay data={data} />;
    case 'experience':
      return <ExperienceDisplay data={data} />;
    default:
      return <div>Unknown data type</div>;
  }
};

export default DataDisplay;
