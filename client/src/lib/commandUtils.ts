export const VALID_COMMANDS = [
  'ls',
  'skills',
  'k', // shortcut for skills
  'experience',
  'x', // shortcut for experience
  'projects',
  'p', // shortcut for projects
  'contact',
  'c', // shortcut for contact
  'education',
  'e', // shortcut for education
  'download',
  'd', // shortcut for download
  'history',
  'h', // shortcut for history
  'date',
  'clear',
] as const;

export const COMMAND_MAP: Record<string, string> = {
  k: 'skills',
  x: 'experience',
  p: 'projects',
  c: 'contact',
  e: 'education',
  d: 'download',
  h: 'history',
};

export const isValidCommand = (input: string): boolean => {
  const trimmedInput = input.trim().toLowerCase();
  return VALID_COMMANDS.includes(
    trimmedInput as (typeof VALID_COMMANDS)[number]
  );
};

export const getActualCommand = (input: string): string => {
  const trimmedInput = input.trim().toLowerCase();
  return COMMAND_MAP[trimmedInput] || trimmedInput;
};
