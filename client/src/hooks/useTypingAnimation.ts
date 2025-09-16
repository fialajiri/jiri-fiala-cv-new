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
  const typingTimeoutRef = useRef<number | null>(null);
  const accumulatedContentRef = useRef<Record<string, string>>({});
  const typingQueueRef = useRef<Record<string, string[]>>({});
  const isTypingRef = useRef<Record<string, boolean>>({});

  const addChunkToQueue = useCallback((messageId: string, chunk: string) => {
    if (!typingQueueRef.current[messageId]) {
      typingQueueRef.current[messageId] = [];
    }
    typingQueueRef.current[messageId].push(chunk);

    // Start typing if not already typing
    if (!isTypingRef.current[messageId]) {
      processTypingQueue(messageId);
    }
  }, []);

  const processTypingQueue = useCallback(
    (messageId: string, speed: number = 25) => {
      if (
        !typingQueueRef.current[messageId] ||
        typingQueueRef.current[messageId].length === 0
      ) {
        isTypingRef.current[messageId] = false;
        return;
      }

      isTypingRef.current[messageId] = true;
      const chunk = typingQueueRef.current[messageId].shift()!;
      let currentIndex = 0;

      const typeNextChar = () => {
        if (currentIndex < chunk.length) {
          const nextChar = chunk[currentIndex];
          state.setDisplayedContent(prev => ({
            ...prev,
            [messageId]: (prev[messageId] || '') + nextChar,
          }));
          currentIndex++;

          // Variable speed for more natural typing
          const delay =
            nextChar === ' '
              ? speed * 0.5
              : nextChar === '.' || nextChar === '!' || nextChar === '?'
                ? speed * 2
                : nextChar === '\n'
                  ? speed * 3
                  : speed;

          typingTimeoutRef.current = setTimeout(typeNextChar, delay);
        } else {
          // Chunk finished, process next chunk in queue
          setTimeout(() => processTypingQueue(messageId, speed), 50);
        }
      };

      typeNextChar();
    },
    [state]
  );

  const initializeMessage = useCallback(
    (messageId: string) => {
      state.setDisplayedContent(prev => ({ ...prev, [messageId]: '' }));
      state.setAccumulatedContent(prev => ({ ...prev, [messageId]: '' }));
      accumulatedContentRef.current[messageId] = '';
      typingQueueRef.current[messageId] = [];
      isTypingRef.current[messageId] = false;
    },
    [state]
  );

  const addChunk = useCallback(
    (messageId: string, chunk: string) => {
      accumulatedContentRef.current[messageId] =
        (accumulatedContentRef.current[messageId] || '') + chunk;
      state.setAccumulatedContent(prev => ({
        ...prev,
        [messageId]: accumulatedContentRef.current[messageId],
      }));

      // Add chunk to typing queue for live display
      addChunkToQueue(messageId, chunk);
    },
    [state, addChunkToQueue]
  );

  const cleanup = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  }, []);

  return {
    addChunk,
    initializeMessage,
    cleanup,
    isTypingRef,
    accumulatedContentRef,
  };
};
