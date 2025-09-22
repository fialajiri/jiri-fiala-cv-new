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
  'theme',
  'set',
  'ping',
  'sysinfo',
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

  // Check for exact matches first
  if (
    VALID_COMMANDS.includes(trimmedInput as (typeof VALID_COMMANDS)[number])
  ) {
    return true;
  }

  // Check for compound commands like "set theme <name>"
  if (trimmedInput.startsWith('set theme ')) {
    return true;
  }

  // Check for ping command with URL
  if (trimmedInput.startsWith('ping ')) {
    return true;
  }

  return false;
};

export const getActualCommand = (input: string): string => {
  const trimmedInput = input.trim().toLowerCase();
  return COMMAND_MAP[trimmedInput] || trimmedInput;
};

export const extractPingUrl = (input: string): string | null => {
  const trimmedInput = input.trim();
  if (trimmedInput.toLowerCase().startsWith('ping ')) {
    const url = trimmedInput.substring(5).trim();
    return url || null;
  }
  return null;
};

export const isValidUrl = (url: string): boolean => {
  try {
    // Add protocol if missing
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
    new URL(urlWithProtocol);
    return true;
  } catch {
    return false;
  }
};
