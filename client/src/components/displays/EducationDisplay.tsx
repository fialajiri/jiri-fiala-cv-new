import React from 'react';
import './EducationDisplay.css';

interface University {
  name: string;
  url: string;
  location: string;
}

interface Study {
  id: string;
  university: University;
  startDate: string;
  endDate: string;
  studyType: string;
  faculty: string;
  primaryField: string;
  secondaryField: string;
  thesis: string;
}

interface EducationData {
  title: string;
  studies: Study[];
}

interface EducationDisplayProps {
  data: EducationData;
}

const EducationDisplay: React.FC<EducationDisplayProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="education-display">
      <h3>== {data.title} ==</h3>

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
            <div className="university-location">
              {study.university.location}
            </div>
          </div>

          <div className="faculty-info">
            <div className="faculty">Faculty: {study.faculty}</div>
            <div className="primary-field">Field: {study.primaryField}</div>
            {study.secondaryField && (
              <div className="secondary-field">
                Secondary: {study.secondaryField}
              </div>
            )}
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
