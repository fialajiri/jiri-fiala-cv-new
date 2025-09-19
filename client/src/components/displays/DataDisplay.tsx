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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  onDownload?: (filename: string) => void;
  onSelectionComplete?: () => void;
}

const DataDisplay: React.FC<DataDisplayProps> = ({
  type,
  data,
  onDownload,
  onSelectionComplete,
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
      return (
        <CVDownloadDisplay
          onDownload={onDownload || (() => {})}
          onSelectionComplete={onSelectionComplete}
        />
      );
    default:
      return <div>Unknown data type</div>;
  }
};

export default DataDisplay;
