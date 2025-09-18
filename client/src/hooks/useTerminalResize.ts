import { useState, useCallback } from 'react';
import type { RndResizeCallback, RndDragCallback } from 'react-rnd';
import {
  TERMINAL_DEFAULT_SIZE,
  TERMINAL_DEFAULT_POSITION,
} from '../lib/constants/terminal';

export const useTerminalResize = () => {
  const [terminalSize, setTerminalSize] = useState(TERMINAL_DEFAULT_SIZE);
  const [terminalPosition, setTerminalPosition] = useState(
    TERMINAL_DEFAULT_POSITION
  );

  const handleDragStop: RndDragCallback = useCallback((_, d) => {
    setTerminalPosition({ x: d.x, y: d.y });
  }, []);

  const handleResizeStop: RndResizeCallback = useCallback(
    (_, __, ref, ___, position) => {
      setTerminalSize({
        width: ref.style.width,
        height: ref.style.height,
      });
      setTerminalPosition({
        x: position.x,
        y: position.y,
      });
    },
    []
  );

  return {
    terminalSize,
    terminalPosition,
    setTerminalSize,
    setTerminalPosition,
    handleDragStop,
    handleResizeStop,
  };
};
