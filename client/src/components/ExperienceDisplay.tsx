import React from 'react';
import './ExperienceDisplay.css';

interface Company {
  name: string;
  url: string;
  location: string;
}

interface Job {
  id: string;
  company: Company;
  jobTitle: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface ExperienceData {
  title: string;
  jobs: Job[];
}

interface ExperienceDisplayProps {
  data: ExperienceData;
}

const ExperienceDisplay: React.FC<ExperienceDisplayProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="experience-display">
      <h3>== {data.title} ==</h3>

      {data.jobs.map(job => (
        <div key={job.id} className="job-item">
          <div className="job-header">
            <div className="job-title">{job.jobTitle}</div>
            <div className="job-dates">
              {formatDate(job.startDate)} - {formatDate(job.endDate)}
            </div>
          </div>

          <div className="company-info">
            <div className="company-name">{job.company.name}</div>
            <div className="company-location">{job.company.location}</div>
          </div>

          <div className="job-responsibilities">
            <div className="responsibilities-title">Responsibilities:</div>
            {job.responsibilities.map((responsibility, index) => (
              <div key={index} className="responsibility-item">
                <span className="bullet">•</span>
                <span className="responsibility-text">{responsibility}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceDisplay;
