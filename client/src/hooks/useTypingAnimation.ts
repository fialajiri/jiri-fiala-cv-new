import { useRef, useCallback } from 'react';

interface TypingState {
  displayedContent: Record<string, string>;
  setDisplayedContent: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
}

export const useTypingAnimation = (state: TypingState) => {
  const accumulatedContentRef = useRef<Record<string, string>>({});

  const initializeMessage = useCallback(
    (messageId: string) => {
      state.setDisplayedContent(prev => ({ ...prev, [messageId]: '' }));
    },
    [state]
  );

  const addChunk = useCallback(
    (messageId: string, chunk: string) => {
      accumulatedContentRef.current[messageId] =
        (accumulatedContentRef.current[messageId] || '') + chunk;

      state.setDisplayedContent(prev => ({
        ...prev,
        [messageId]: accumulatedContentRef.current[messageId],
      }));
    },
    [state]
  );

  return {
    addChunk,
    initializeMessage,
  };
};
