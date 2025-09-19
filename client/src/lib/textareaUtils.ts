/**
 * Utility functions for textarea management
 */

/**
 * Auto-resize textarea based on content
 */
export const autoResizeTextarea = (textarea: HTMLTextAreaElement): void => {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
};

/**
 * Handle textarea input event for auto-resize
 */
export const handleTextareaInput = (
  e: React.FormEvent<HTMLTextAreaElement>
): void => {
  const target = e.target as HTMLTextAreaElement;
  autoResizeTextarea(target);
};
