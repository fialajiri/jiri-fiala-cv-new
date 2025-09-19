import { useEffect, type RefObject } from 'react';

interface UseFocusManagementProps {
  inputRef: RefObject<HTMLTextAreaElement | null>;
  isTyping: boolean;
}

export const useFocusManagement = ({
  inputRef,
  isTyping,
}: UseFocusManagementProps) => {
  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  // Focus input when clicking anywhere on terminal, but not when selecting text
  useEffect(() => {
    let isSelecting = false;

    const handleMouseDown = () => {
      // Reset selection state on mouse down
      isSelecting = false;
    };

    const handleMouseMove = () => {
      // If mouse moves while button is down, user is likely selecting
      if (window.getSelection()?.toString()) {
        isSelecting = true;
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!isTyping && !isSelecting) {
        // Don't focus if clicking on selectable elements
        const target = e.target as HTMLElement;
        if (
          target &&
          (target.tagName === 'A' ||
            target.tagName === 'BUTTON' ||
            target.closest('a') ||
            target.closest('button') ||
            target.closest('[role="button"]'))
        ) {
          return;
        }

        // Check if there's any text selected after the click
        setTimeout(() => {
          const selection = window.getSelection();
          if (!selection || selection.toString().length === 0) {
            inputRef.current?.focus();
          }
        }, 0);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [inputRef, isTyping]);
};
