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
  description?: string;
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
  {
    command: 'set theme',
    description: 'Change the terminal theme (e.g. set theme dark)',
  },
];

export const COMPOUND_COMMAND_SUGGESTIONS: CommandSuggestion[] = [
  {
    command: 'set theme',
    description: 'Change the terminal theme (e.g. set theme dark)',
  },
];

export const getThemeSuggestions = (): CommandSuggestion[] => {
  return [
    { command: 'theme', description: 'List available themes' },
    { command: 'set theme dark' },
    { command: 'set theme light' },
    { command: 'set theme matrix' },
    { command: 'set theme dracula' },
    { command: 'set theme nord' },
    { command: 'set theme monokai' },
    { command: 'set theme gruvbox' },
    { command: 'set theme solarized' },
    { command: 'set theme tokyo' },
    { command: 'set theme ubuntu' },
    { command: 'set theme cobalt' },
  ];
};

export const isValidCommand = (input: string): boolean => {
  const trimmedInput = input.trim().toLowerCase();

  if (
    VALID_COMMANDS.includes(trimmedInput as (typeof VALID_COMMANDS)[number])
  ) {
    return true;
  }

  // Check for compound commands like "set theme <name>"
  if (trimmedInput.startsWith('set theme ')) {
    // Check if the theme name exists in our theme suggestions
    const themeSuggestions = getThemeSuggestions();
    return themeSuggestions.some(
      suggestion => suggestion.command.toLowerCase() === trimmedInput
    );
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
    return COMMAND_SUGGESTIONS;
  }

  // Check for theme-specific commands
  if (trimmedInput === 'theme') {
    return getThemeSuggestions();
  }

  // Check for compound commands first
  if (trimmedInput.startsWith('set')) {
    // If it's a set theme command, show theme suggestions
    if (trimmedInput.startsWith('set theme')) {
      const themeQuery = trimmedInput.substring(9).trim(); // Remove 'set theme '
      if (!themeQuery) {
        return getThemeSuggestions().filter(suggestion =>
          suggestion.command.startsWith('set theme')
        );
      }

      // Filter theme suggestions based on the query
      return getThemeSuggestions().filter(suggestion => {
        const command = suggestion.command.toLowerCase();
        return command.includes(trimmedInput);
      });
    }

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
