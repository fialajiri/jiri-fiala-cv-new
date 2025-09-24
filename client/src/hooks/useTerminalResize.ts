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
  const [originalSize, setOriginalSize] = useState(TERMINAL_DEFAULT_SIZE);
  const [originalPosition, setOriginalPosition] = useState(
    TERMINAL_DEFAULT_POSITION
  );

  useEffect(() => {
    if (isMobile) {
      setOriginalSize(terminalSize);
      setOriginalPosition(terminalPosition);
      setTerminalSize(TERMINAL_MOBILE_SIZE);
      setTerminalPosition(TERMINAL_MOBILE_POSITION);
    } else {
      setTerminalSize(originalSize);
      setTerminalPosition(originalPosition);
    }
  }, [
    isMobile,
    terminalSize,
    terminalPosition,
    originalSize,
    originalPosition,
  ]);

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
