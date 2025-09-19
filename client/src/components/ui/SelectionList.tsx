import React, { useState, useEffect, useCallback } from 'react';
import './SelectionList.css';

interface SelectionOption {
  id: string;
  label: string;
  value: string;
}

interface SelectionListProps {
  options: SelectionOption[];
  onSelectionChange: (selectedId: string | null) => void;
  onConfirm: (selectedId: string | null) => void;
  onCancel: () => void;
  title?: string;
  disabled?: boolean;
}

const SelectionList: React.FC<SelectionListProps> = ({
  options,
  onSelectionChange,
  onConfirm,
  onCancel,
  title,
  disabled = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : options.length - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));
          break;
        case ' ': {
          e.preventDefault();
          const option = options[selectedIndex];
          const newSelectedId = selectedId === option.id ? null : option.id;
          setSelectedId(newSelectedId);
          onSelectionChange(newSelectedId);
          break;
        }
        case 'Enter':
          e.preventDefault();
          onConfirm(selectedId);
          break;
        case 'Escape':
          e.preventDefault();
          onCancel();
          break;
      }
    },
    [
      disabled,
      onConfirm,
      selectedId,
      options,
      selectedIndex,
      onSelectionChange,
      onCancel,
    ]
  );

  useEffect(() => {
    if (disabled) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === ' ' ||
        e.key === 'Enter' ||
        e.key === 'Escape'
      ) {
        handleKeyDown(e as unknown as React.KeyboardEvent);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [selectedIndex, selectedId, options, handleKeyDown, disabled]);

  return (
    <div
      className={`selection-list ${disabled ? 'disabled' : ''}`}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
    >
      {title && <div className="selection-title">{title}</div>}
      <div className="selection-options">
        {options.map((option, index) => (
          <div
            key={option.id}
            className={`selection-option ${index === selectedIndex && !disabled ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
          >
            <span className="checkbox">
              {selectedId === option.id ? '[x]' : '[ ]'}
            </span>
            <span className="option-label">{option.label}</span>
          </div>
        ))}
      </div>
      {!disabled && (
        <div className="selection-instructions">
          Use ↑↓ to navigate, Space to select/deselect, Enter to confirm, Esc to
          cancel
        </div>
      )}
    </div>
  );
};

export default SelectionList;
