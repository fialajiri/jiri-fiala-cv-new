import React, { useState, useEffect, useCallback } from 'react';
import './SelectionList.css';

interface SelectionOption {
  id: string;
  label: string;
  value: string;
}

interface SelectionListProps {
  options: SelectionOption[];
  onSelectionChange: (selectedIds: string[]) => void;
  onConfirm: (selectedIds: string[]) => void;
  title?: string;
  multiSelect?: boolean;
  disabled?: boolean;
}

const SelectionList: React.FC<SelectionListProps> = ({
  options,
  onSelectionChange,
  onConfirm,
  title,
  multiSelect = false,
  disabled = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
        case ' ':
          e.preventDefault();
          if (multiSelect) {
            const option = options[selectedIndex];
            const newSelectedIds = selectedIds.includes(option.id)
              ? selectedIds.filter(id => id !== option.id)
              : [...selectedIds, option.id];
            setSelectedIds(newSelectedIds);
            onSelectionChange(newSelectedIds);
          } else {
            const option = options[selectedIndex];
            const newSelectedIds = [option.id];
            setSelectedIds(newSelectedIds);
            onSelectionChange(newSelectedIds);
          }
          break;
        case 'Enter':
          e.preventDefault();
          onConfirm(selectedIds);
          break;
        case 'Escape':
          e.preventDefault();
          onConfirm([]);
          break;
      }
    },
    [
      disabled,
      multiSelect,
      onConfirm,
      selectedIds,
      options,
      selectedIndex,
      onSelectionChange,
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
  }, [
    selectedIndex,
    selectedIds,
    options,
    multiSelect,
    handleKeyDown,
    disabled,
  ]);

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
              {selectedIds.includes(option.id) ? '[x]' : '[ ]'}
            </span>
            <span className="option-label">{option.label}</span>
          </div>
        ))}
      </div>
      {!disabled && (
        <div className="selection-instructions">
          Use ↑↓ to navigate, Space to select, Enter to confirm, Esc to cancel
        </div>
      )}
    </div>
  );
};

export default SelectionList;
