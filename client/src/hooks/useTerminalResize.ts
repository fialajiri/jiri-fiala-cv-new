import { useState, useCallback, useEffect } from 'react';
import type { RndResizeCallback, RndDragCallback } from 'react-rnd';
import {
  TERMINAL_DEFAULT_SIZE,
  TERMINAL_DEFAULT_POSITION,
  TERMINAL_MOBILE_SIZE,
  TERMINAL_MOBILE_POSITION,
} from '../lib/constants/terminal';
import { useScreenSize } from './useScreenSize';

export const useTerminalResize = () => {
  const { isMobile } = useScreenSize();
  const [terminalSize, setTerminalSize] = useState(TERMINAL_DEFAULT_SIZE);
  const [terminalPosition, setTerminalPosition] = useState(
    TERMINAL_DEFAULT_POSITION
  );
  const [originalSize, setOriginalSize] = useState<
    typeof TERMINAL_DEFAULT_SIZE | null
  >(null);
  const [originalPosition, setOriginalPosition] = useState<
    typeof TERMINAL_DEFAULT_POSITION | null
  >(null);

  useEffect(() => {
    if (isMobile) {
      // Save current size/position as original if not already saved
      if (originalSize === null && originalPosition === null) {
        setOriginalSize(terminalSize);
        setOriginalPosition(terminalPosition);
      }
      setTerminalSize(TERMINAL_MOBILE_SIZE);
      setTerminalPosition(TERMINAL_MOBILE_POSITION);
    } else {
      // Restore original size/position if available, otherwise use defaults
      if (originalSize && originalPosition) {
        setTerminalSize(originalSize);
        setTerminalPosition(originalPosition);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const handleDragStop: RndDragCallback = useCallback(
    (_, d) => {
      if (!isMobile) {
        setTerminalPosition({ x: d.x, y: d.y });
      }
    },
    [isMobile]
  );

  const handleResizeStop: RndResizeCallback = useCallback(
    (_, __, ref, ___, position) => {
      if (!isMobile) {
        setTerminalSize({
          width: ref.style.width,
          height: ref.style.height,
        });
        setTerminalPosition({
          x: position.x,
          y: position.y,
        });
      }
    },
    [isMobile]
  );

  return {
    terminalSize,
    terminalPosition,
    setTerminalSize,
    setTerminalPosition,
    handleDragStop,
    handleResizeStop,
    isMobile,
  };
};
