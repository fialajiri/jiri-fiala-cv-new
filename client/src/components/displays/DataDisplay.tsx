import React from 'react';
import {
  ContactDisplay,
  EducationDisplay,
  SkillsDisplay,
  ProjectsDisplay,
  ExperienceDisplay,
  CVDownloadDisplay,
} from './';

interface DataDisplayProps {
  type:
    | 'contact'
    | 'education'
    | 'skills'
    | 'projects'
    | 'experience'
    | 'cv-download';
  data?: any;
  onDownload?: (filename: string) => void;
}

const DataDisplay: React.FC<DataDisplayProps> = ({
  type,
  data,
  onDownload,
}) => {
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
    case 'cv-download':
      return <CVDownloadDisplay onDownload={onDownload || (() => {})} />;
    default:
      return <div>Unknown data type</div>;
  }
};

export default DataDisplay;
