export const VALID_COMMANDS = [
  'ls',
  'skills',
  's', // shortcut for skills
  'work',
  'w', // shortcut for work-experience
  'projects',
  'p', // shortcut for projects
  'contact',
  'c', // shortcut for contact
  'education',
  'e', // shortcut for education
  'download',
  'd', // shortcut for download
  'history',
  'about',
  'a', // shortcut for about
  'date',
  'clear',
] as const;

export const COMMAND_MAP: Record<string, string> = {
  s: 'skills',
  w: 'work',
  p: 'projects',
  c: 'contact',
  e: 'education',
  d: 'download',
  a: 'about',
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
