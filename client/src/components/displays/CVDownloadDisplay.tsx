import React, { useState } from 'react';
import SelectionList from '../ui/SelectionList';
import './CVDownloadDisplay.css';

interface CVDownloadDisplayProps {
  onDownload: (language: string) => void;
  onSelectionComplete?: () => void;
}

const CVDownloadDisplay: React.FC<CVDownloadDisplayProps> = ({
  onDownload,
  onSelectionComplete,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const cvOptions = [
    { id: 'en', label: 'English', value: 'Jiri_Fiala_En.pdf' },
    { id: 'cz', label: 'Czech', value: 'Jiri_Fiala_CZ.pdf' },
  ];

  const handleSelectionChange = () => {
    // For single selection, we don't need to do anything here
  };

  const handleConfirm = (selectedIds: string[]) => {
    if (selectedIds.length > 0) {
      const selectedOption = cvOptions.find(
        option => option.id === selectedIds[0]
      );
      if (selectedOption) {
        onDownload(selectedOption.value);
        setIsCompleted(true);
        onSelectionComplete?.();
      }
    }
  };

  return (
    <div className="cv-download-display">
      <h3>== Download CV ==</h3>
      <SelectionList
        options={cvOptions}
        onSelectionChange={handleSelectionChange}
        onConfirm={handleConfirm}
        multiSelect={false}
        disabled={isCompleted}
      />
    </div>
  );
};

export default CVDownloadDisplay;
