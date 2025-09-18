import { useRef, useCallback } from 'react';

interface TypingState {
  displayedContent: Record<string, string>;
  accumulatedContent: Record<string, string>;
  setDisplayedContent: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  setAccumulatedContent: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
}

export const useTypingAnimation = (state: TypingState) => {
  const accumulatedContentRef = useRef<Record<string, string>>({});

  const initializeMessage = useCallback(
    (messageId: string) => {
      state.setDisplayedContent(prev => ({ ...prev, [messageId]: '' }));
      state.setAccumulatedContent(prev => ({ ...prev, [messageId]: '' }));
      accumulatedContentRef.current[messageId] = '';
    },
    [state]
  );

  const addChunk = useCallback(
    (messageId: string, chunk: string) => {
      accumulatedContentRef.current[messageId] =
        (accumulatedContentRef.current[messageId] || '') + chunk;

      // Update both displayed and accumulated content immediately
      state.setAccumulatedContent(prev => ({
        ...prev,
        [messageId]: accumulatedContentRef.current[messageId],
      }));

      state.setDisplayedContent(prev => ({
        ...prev,
        [messageId]: accumulatedContentRef.current[messageId],
      }));
    },
    [state]
  );

  const cleanup = useCallback(() => {
    // No cleanup needed since we removed timeouts
  }, []);

  return {
    addChunk,
    initializeMessage,
    cleanup,
  };
};
