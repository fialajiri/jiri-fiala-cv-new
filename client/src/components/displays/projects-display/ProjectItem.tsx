import React, { memo } from 'react';
import ClickableUrl from '../../ui/ClickableUrl';
import './ProjectItem.css';

interface Project {
  title: string;
  url: string;
  git: string;
  description: string;
}

interface ProjectItemProps {
  project: Project;
  isModifierPressed: boolean;
  onUrlClick: (url: string, event: React.MouseEvent) => void;
  onFollowLinkClick: (url: string) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  isModifierPressed,
  onUrlClick,
  onFollowLinkClick,
}) => {
  return (
    <div className="project-item">
      <div className="project-header">
        <div className="project-title">{project.title}</div>
      </div>

      <div className="project-description">{project.description}</div>

      <div className="project-urls">
        <ClickableUrl
          url={project.url}
          label="Live"
          isModifierPressed={isModifierPressed}
          onUrlClick={onUrlClick}
          onFollowLinkClick={onFollowLinkClick}
        />
        <ClickableUrl
          url={project.git}
          label="Git"
          isModifierPressed={isModifierPressed}
          onUrlClick={onUrlClick}
          onFollowLinkClick={onFollowLinkClick}
        />
      </div>
    </div>
  );
};

export default memo(ProjectItem);
