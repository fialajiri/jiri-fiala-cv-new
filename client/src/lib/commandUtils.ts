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

export interface CommandSuggestion {
  command: string;
  description: string;
}

export const COMMAND_SUGGESTIONS: CommandSuggestion[] = [
  { command: 'ls', description: 'List available commands and files' },
  { command: 'skills', description: 'Show technical skills and technologies' },
  {
    command: 'work',
    description: 'Display work experience and career history',
  },
  {
    command: 'projects',
    description: 'Show personal and professional projects',
  },
  { command: 'contact', description: 'Display contact information' },
  { command: 'education', description: 'Show educational background' },
  { command: 'download', description: 'Download CV/resume files' },
  { command: 'about', description: 'Show personal information and bio' },
  { command: 'history', description: 'Display command history' },
  { command: 'date', description: 'Show current date and time' },
  { command: 'clear', description: 'Clear the terminal screen' },
  { command: 'theme', description: 'Show available themes' },
  { command: 'set theme <theme>', description: 'Change the terminal theme' },
  { command: 'ping', description: 'Test connection to server' },
];

export const COMPOUND_COMMAND_SUGGESTIONS: CommandSuggestion[] = [
  { command: 'set theme <theme>', description: 'Change the terminal theme' },
];

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

  return false;
};

export const getActualCommand = (input: string): string => {
  const trimmedInput = input.trim().toLowerCase();
  return COMMAND_MAP[trimmedInput] || trimmedInput;
};

export const getCommandSuggestions = (input: string): CommandSuggestion[] => {
  const trimmedInput = input.trim().toLowerCase();

  if (!trimmedInput) {
    return COMMAND_SUGGESTIONS.slice(0, 8); // Show first 8 commands by default
  }

  // Check for compound commands first
  if (trimmedInput.startsWith('set')) {
    return COMPOUND_COMMAND_SUGGESTIONS.filter(suggestion =>
      suggestion.command.toLowerCase().includes(trimmedInput)
    );
  }

  // Filter regular commands
  const filteredCommands = COMMAND_SUGGESTIONS.filter(suggestion => {
    const command = suggestion.command.toLowerCase();
    return command.startsWith(trimmedInput);
  });

  // If no matches found, return empty array
  return filteredCommands.slice(0, 5); // Limit to 5 suggestions
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
