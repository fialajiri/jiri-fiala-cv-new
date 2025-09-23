import React from 'react';
import {
  ContactDisplay,
  EducationDisplay,
  SkillsDisplay,
  ProjectsDisplay,
  ExperienceDisplay,
  CVDownloadDisplay,
} from '../';
import AboutDisplay from '../about-display/AboutDisplay';

interface DataDisplayProps {
  type:
    | 'contact'
    | 'education'
    | 'skills'
    | 'projects'
    | 'experience'
    | 'cv-download'
    | 'about';

  onDownload?: (filename: string) => void;
  onSelectionComplete?: () => void;
  onInputStateChange?: (isActive: boolean) => void;
}

const DataDisplay: React.FC<DataDisplayProps> = ({
  type,
  onDownload,
  onSelectionComplete,
  onInputStateChange,
}) => {
  switch (type) {
    case 'contact':
      return <ContactDisplay />;
    case 'education':
      return <EducationDisplay />;
    case 'skills':
      return <SkillsDisplay />;
    case 'projects':
      return <ProjectsDisplay />;
    case 'experience':
      return <ExperienceDisplay />;
    case 'cv-download':
      return (
        <CVDownloadDisplay
          onDownload={onDownload || (() => {})}
          onSelectionComplete={onSelectionComplete}
          onInputStateChange={onInputStateChange}
        />
      );
    case 'about':
      return <AboutDisplay />;
    default:
      return <div>Unknown data type</div>;
  }
};

export default DataDisplay;
