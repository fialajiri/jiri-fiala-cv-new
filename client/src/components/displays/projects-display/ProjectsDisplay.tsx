import React, { useCallback, memo } from 'react';
import { useModifierKeys } from '../../../hooks/useModifierKeys';
import ProjectItem from './ProjectItem';
import './ProjectsDisplay.css';

interface Project {
  title: string;
  url: string;
  git: string;
  description: string;
}

interface ProjectsData {
  title: string;
  projects: Project[];
}

interface ProjectsDisplayProps {
  data: ProjectsData;
}

const ProjectsDisplay: React.FC<ProjectsDisplayProps> = ({ data }) => {
  const isModifierPressed = useModifierKeys();

  const handleUrlClick = useCallback((url: string, event: React.MouseEvent) => {
    if (event.metaKey || event.ctrlKey) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const handleFollowLinkClick = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div className="projects-display">
      <h3>== {data.title} ==</h3>

      {data.projects.map((project, index) => (
        <ProjectItem
          key={project.title || index}
          project={project}
          isModifierPressed={isModifierPressed}
          onUrlClick={handleUrlClick}
          onFollowLinkClick={handleFollowLinkClick}
        />
      ))}
    </div>
  );
};

export default memo(ProjectsDisplay);
