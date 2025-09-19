import React, { useEffect, useState } from 'react';
import SelectionList from '../../ui/SelectionList';
import './CVDownloadDisplay.css';

interface CVDownloadDisplayProps {
  onDownload: (language: string) => void;
  onSelectionComplete?: () => void;
  onInputStateChange?: (isActive: boolean) => void;
}

const CVDownloadDisplay: React.FC<CVDownloadDisplayProps> = ({
  onDownload,
  onSelectionComplete,
  onInputStateChange,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const cvOptions = [
    { id: 'en', label: 'English', value: 'Jiri_Fiala_En.pdf' },
    { id: 'cz', label: 'Czech', value: 'Jiri_Fiala_CZ.pdf' },
  ];

  useEffect(() => {
    onInputStateChange?.(isCompleted);
    return () => onInputStateChange?.(true);
  }, [isCompleted, onInputStateChange]);

  const handleConfirm = (selectedId: string | null) => {
    if (selectedId) {
      const selectedOption = cvOptions.find(option => option.id === selectedId);
      if (selectedOption) {
        onDownload(selectedOption.value);
        setIsCompleted(true);
        onSelectionComplete?.();
      }
    }
  };

  const handleCancel = () => {
    setIsCompleted(true);
    onSelectionComplete?.();
  };

  return (
    <div className="cv-download-display">
      <h3>== Download CV ==</h3>
      <SelectionList
        options={cvOptions}
        onSelectionChange={() => {}}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        disabled={isCompleted}
      />
    </div>
  );
};

export default CVDownloadDisplay;
