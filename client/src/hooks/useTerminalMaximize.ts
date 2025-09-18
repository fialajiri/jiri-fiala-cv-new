import { useCallback, useState } from 'react';
import {
  TERMINAL_DEFAULT_POSITION,
  TERMINAL_DEFAULT_SIZE,
  TERMINAL_MAXIMIZED_POSITION,
  TERMINAL_MAXIMIZED_SIZE,
} from '../lib/constants/terminal';
import type { ITerminalPosition, ITerminalSize } from '../types/terminal';

export const useTerminalMaximize = (
  terminalSize: ITerminalSize,
  terminalPosition: ITerminalPosition,
  setTerminalSize: (size: ITerminalSize) => void,
  setTerminalPosition: (position: ITerminalPosition) => void
) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [originalSize, setOriginalSize] = useState(TERMINAL_DEFAULT_SIZE);
  const [originalPosition, setOriginalPosition] = useState(
    TERMINAL_DEFAULT_POSITION
  );

  const handleMaximize = useCallback(() => {
    if (!isMaximized) {
      setOriginalSize(terminalSize);
      setOriginalPosition(terminalPosition);
      setTerminalSize(TERMINAL_MAXIMIZED_SIZE);
      setTerminalPosition(TERMINAL_MAXIMIZED_POSITION);
    } else {
      setTerminalSize(originalSize);
      setTerminalPosition(originalPosition);
    }
    setIsMaximized(!isMaximized);
  }, [
    isMaximized,
    terminalSize,
    terminalPosition,
    originalSize,
    originalPosition,
    setTerminalSize,
    setTerminalPosition,
  ]);

  return { isMaximized, handleMaximize };
};
