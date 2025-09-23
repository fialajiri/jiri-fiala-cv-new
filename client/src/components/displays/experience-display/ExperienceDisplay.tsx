import React from 'react';
import './ExperienceDisplay.css';
import { formatDate } from '../../../lib/utils';
import experienceData from '../data/jobs-en.json';

const data = experienceData as ExperienceData;

interface ICompany {
  name: string;
  url: string;
  location: string;
}

interface IJob {
  id: string;
  company: ICompany;
  jobTitle: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface ExperienceData {
  title: string;
  jobs: IJob[];
}

const ExperienceDisplay: React.FC = () => {
  return (
    <div className="experience-display">
      <h3>== {data.title} ==</h3>

      {data.jobs.map(job => (
        <div key={job.id} className="job-item">
          <div className="job-header">
            <div className="job-title-company">
              {job.jobTitle} at {job.company.name}
            </div>
            <div className="job-dates">
              {formatDate(job.startDate)} - {formatDate(job.endDate)}
            </div>
          </div>

          <div className="job-responsibilities">
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
