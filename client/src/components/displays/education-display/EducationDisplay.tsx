import React from 'react';
import './EducationDisplay.css';
import { formatDate } from '../../../lib/utils';
import educationData from '../data/education-en.json';

const data = educationData as EducationData;

interface University {
  name: string;
  url: string;
}

interface Study {
  id: string;
  university: University;
  startDate: string;
  endDate: string;
  studyType: string;
  faculty: string;
  primaryField: string;
  thesis: string;
}

interface EducationData {
  title: string;
  studies: Study[];
}

const EducationDisplay: React.FC = () => {
  return (
    <div className="education-display">
      <div className="education-display-title">{data.title}:</div>

      {data.studies.map(study => (
        <div key={study.id} className="education-item">
          <div className="education-header">
            <div className="study-type">{study.studyType}</div>
            <div className="study-dates">
              {formatDate(study.startDate)} - {formatDate(study.endDate)}
            </div>
          </div>

          <div className="university-info">
            <div className="university-name">{study.university.name}</div>
          </div>

          <div className="faculty-info">
            <div className="faculty">Faculty: {study.faculty}</div>
            <div className="primary-field">Field: {study.primaryField}</div>
            {study.thesis && (
              <div className="thesis">Thesis: {study.thesis}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationDisplay;
