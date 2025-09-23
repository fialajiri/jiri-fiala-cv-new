import React, { useCallback, memo } from 'react';
import { useModifierKeys } from '../../../hooks/useModifierKeys';
import ProjectItem from './ProjectItem';
import './ProjectsDisplay.css';
import projectsData from '../data/projects-en.json';

const data = projectsData as ProjectsData;

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

const ProjectsDisplay: React.FC = () => {
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
      <div className="projects-display-title">{data.title}:</div>

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
