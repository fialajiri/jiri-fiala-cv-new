import React from 'react';
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
  const handleUrlClick = (url: string, event: React.MouseEvent) => {
    if (event.metaKey || event.ctrlKey) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="projects-display">
      <h3>== {data.title} ==</h3>

      {data.projects.map((project, index) => (
        <div key={index} className="project-item">
          <div className="project-header">
            <div className="project-title">{project.title}</div>
          </div>

          <div className="project-description">{project.description}</div>

          <div className="project-urls">
            <div className="project-url">
              <span className="url-label">Live:</span>
              <span
                className="clickable-url"
                onClick={e => handleUrlClick(project.url, e)}
                title="Cmd+Click to open in new tab"
              >
                {project.url}
              </span>
            </div>
            <div className="project-url">
              <span className="url-label">Git:</span>
              <span
                className="clickable-url"
                onClick={e => handleUrlClick(project.git, e)}
                title="Cmd+Click to open in new tab"
              >
                {project.git}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsDisplay;
