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
  return (
    <div className="projects-display">
      <h3>== {data.title} ==</h3>

      {data.projects.map((project, index) => (
        <div key={index} className="project-item">
          <div className="project-header">
            <div className="project-title">{project.title}</div>
            <div className="project-links">
              <span className="project-link">🌐 Live</span>
              <span className="project-link">📁 Code</span>
            </div>
          </div>

          <div className="project-description">{project.description}</div>

          <div className="project-urls">
            <div className="project-url">
              <span className="url-label">Live:</span> {project.url}
            </div>
            <div className="project-url">
              <span className="url-label">Git:</span> {project.git}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsDisplay;
