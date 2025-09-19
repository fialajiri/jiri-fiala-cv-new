import { useState, useEffect } from 'react';

export const useModifierKeys = () => {
  const [isModifierPressed, setIsModifierPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        setIsModifierPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.metaKey && !event.ctrlKey) {
        setIsModifierPressed(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return isModifierPressed;
};
