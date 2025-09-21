export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    // Terminal colors
    background: string;
    terminalBackground: string;
    text: string;
    terminalText: string;
    terminalGreen: string;

    // UI colors
    accent: string;
    accentHover: string;

    // Border and separator colors
    border: string;
    terminalBorder: string;

    // Header colors
    headerBackground: string;
    headerText: string;

    // Input colors
    inputText: string;
    promptUser: string;
    promptPath: string;
    promptSeparator: string;
    promptDollar: string;

    // Selection colors
    selectionBackground: string;
    selectionText: string;

    // Scrollbar colors
    scrollbarTrack: string;
    scrollbarThumb: string;
    scrollbarThumbHover: string;

    // Button colors
    buttonBackground: string;
    buttonHover: string;
    maximizeButton: string;
    maximizeButtonHover: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'dark',
    name: 'Dark',
    description: 'Classic dark terminal theme',
    colors: {
      background: '#000000',
      terminalBackground: '#000000',
      text: '#ffffff',
      terminalText: '#ffffff',
      terminalGreen: '#00e600',
      accent: '#646cff',
      accentHover: '#535bf2',
      border: '#666666',
      terminalBorder: '#666666',
      headerBackground: '#2d2d2d',
      headerText: '#b8b8b8',
      inputText: '#f3f4f6',
      promptUser: '#60a5fa',
      promptPath: '#a855f7',
      promptSeparator: '#ffffff',
      promptDollar: '#ffffff',
      selectionBackground: '#4a5568',
      selectionText: '#ffffff',
      scrollbarTrack: '#000000',
      scrollbarThumb: '#4a5568',
      scrollbarThumbHover: '#6b7280',
      buttonBackground: '#f9f9f9',
      buttonHover: '#e5e5e5',
      maximizeButton: '#28ca42',
      maximizeButtonHover: '#22a03a',
    },
  },
  {
    id: 'light',
    name: 'Light',
    description: 'Clean light terminal theme',
    colors: {
      background: '#ffffff',
      terminalBackground: '#ffffff',
      text: '#213547',
      terminalText: '#213547',
      terminalGreen: '#00aa00',
      accent: '#747bff',
      accentHover: '#646cff',
      border: '#e5e7eb',
      terminalBorder: '#e5e7eb',
      headerBackground: '#f3f4f6',
      headerText: '#374151',
      inputText: '#1f2937',
      promptUser: '#2563eb',
      promptPath: '#7c3aed',
      promptSeparator: '#374151',
      promptDollar: '#374151',
      selectionBackground: '#dbeafe',
      selectionText: '#1e40af',
      scrollbarTrack: '#ffffff',
      scrollbarThumb: '#d1d5db',
      scrollbarThumbHover: '#9ca3af',
      buttonBackground: '#f9f9f9',
      buttonHover: '#e5e5e5',
      maximizeButton: '#10b981',
      maximizeButtonHover: '#059669',
    },
  },
  {
    id: 'matrix',
    name: 'Matrix',
    description: 'Green matrix-style terminal',
    colors: {
      background: '#000000',
      terminalBackground: '#000000',
      text: '#00e600',
      terminalText: '#00e600',
      terminalGreen: '#00e600',
      accent: '#00e600',
      accentHover: '#00cc00',
      border: '#003300',
      terminalBorder: '#003300',
      headerBackground: '#001100',
      headerText: '#00e600',
      inputText: '#00e600',
      promptUser: '#00e600',
      promptPath: '#00e600',
      promptSeparator: '#00e600',
      promptDollar: '#00e600',
      selectionBackground: '#003300',
      selectionText: '#00e600',
      scrollbarTrack: '#000000',
      scrollbarThumb: '#003300',
      scrollbarThumbHover: '#006600',
      buttonBackground: '#001100',
      buttonHover: '#002200',
      maximizeButton: '#00e600',
      maximizeButtonHover: '#00cc00',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    description: 'Dark purple theme inspired by Dracula',
    colors: {
      background: '#282a36',
      terminalBackground: '#282a36',
      text: '#f8f8f2',
      terminalText: '#f8f8f2',
      terminalGreen: '#50fa7b',
      accent: '#bd93f9',
      accentHover: '#a78bfa',
      border: '#44475a',
      terminalBorder: '#44475a',
      headerBackground: '#44475a',
      headerText: '#f8f8f2',
      inputText: '#f8f8f2',
      promptUser: '#8be9fd',
      promptPath: '#ff79c6',
      promptSeparator: '#f8f8f2',
      promptDollar: '#f8f8f2',
      selectionBackground: '#44475a',
      selectionText: '#f8f8f2',
      scrollbarTrack: '#282a36',
      scrollbarThumb: '#44475a',
      scrollbarThumbHover: '#6272a4',
      buttonBackground: '#44475a',
      buttonHover: '#6272a4',
      maximizeButton: '#50fa7b',
      maximizeButtonHover: '#3ddb5f',
    },
  },
  {
    id: 'nord',
    name: 'Nord',
    description: 'Arctic-inspired color palette',
    colors: {
      background: '#2e3440',
      terminalBackground: '#2e3440',
      text: '#d8dee9',
      terminalText: '#d8dee9',
      terminalGreen: '#a3be8c',
      accent: '#88c0d0',
      accentHover: '#5e81ac',
      border: '#4c566a',
      terminalBorder: '#4c566a',
      headerBackground: '#3b4252',
      headerText: '#d8dee9',
      inputText: '#d8dee9',
      promptUser: '#88c0d0',
      promptPath: '#b48ead',
      promptSeparator: '#d8dee9',
      promptDollar: '#d8dee9',
      selectionBackground: '#4c566a',
      selectionText: '#d8dee9',
      scrollbarTrack: '#2e3440',
      scrollbarThumb: '#4c566a',
      scrollbarThumbHover: '#5e81ac',
      buttonBackground: '#4c566a',
      buttonHover: '#5e81ac',
      maximizeButton: '#a3be8c',
      maximizeButtonHover: '#8fbc8f',
    },
  },
  {
    id: 'monokai',
    name: 'Monokai',
    description: 'Classic Monokai color scheme',
    colors: {
      background: '#272822',
      terminalBackground: '#272822',
      text: '#f8f8f2',
      terminalText: '#f8f8f2',
      terminalGreen: '#a6e22e',
      accent: '#66d9ef',
      accentHover: '#4ecdc4',
      border: '#49483e',
      terminalBorder: '#49483e',
      headerBackground: '#49483e',
      headerText: '#f8f8f2',
      inputText: '#f8f8f2',
      promptUser: '#66d9ef',
      promptPath: '#ae81ff',
      promptSeparator: '#f8f8f2',
      promptDollar: '#f8f8f2',
      selectionBackground: '#49483e',
      selectionText: '#f8f8f2',
      scrollbarTrack: '#272822',
      scrollbarThumb: '#49483e',
      scrollbarThumbHover: '#75715e',
      buttonBackground: '#49483e',
      buttonHover: '#75715e',
      maximizeButton: '#a6e22e',
      maximizeButtonHover: '#9acd32',
    },
  },
  {
    id: 'gruvbox',
    name: 'Gruvbox',
    description: 'Retro groove color scheme',
    colors: {
      background: '#282828',
      terminalBackground: '#282828',
      text: '#ebdbb2',
      terminalText: '#ebdbb2',
      terminalGreen: '#b8bb26',
      accent: '#83a598',
      accentHover: '#689d6a',
      border: '#504945',
      terminalBorder: '#504945',
      headerBackground: '#3c3836',
      headerText: '#ebdbb2',
      inputText: '#ebdbb2',
      promptUser: '#83a598',
      promptPath: '#d3869b',
      promptSeparator: '#ebdbb2',
      promptDollar: '#ebdbb2',
      selectionBackground: '#504945',
      selectionText: '#ebdbb2',
      scrollbarTrack: '#282828',
      scrollbarThumb: '#504945',
      scrollbarThumbHover: '#665c54',
      buttonBackground: '#504945',
      buttonHover: '#665c54',
      maximizeButton: '#b8bb26',
      maximizeButtonHover: '#a4a61c',
    },
  },
  {
    id: 'solarized',
    name: 'Solarized',
    description: 'Solarized dark color scheme',
    colors: {
      background: '#002b36',
      terminalBackground: '#002b36',
      text: '#839496',
      terminalText: '#839496',
      terminalGreen: '#859900',
      accent: '#268bd2',
      accentHover: '#2aa198',
      border: '#073642',
      terminalBorder: '#073642',
      headerBackground: '#073642',
      headerText: '#839496',
      inputText: '#839496',
      promptUser: '#268bd2',
      promptPath: '#d33682',
      promptSeparator: '#839496',
      promptDollar: '#839496',
      selectionBackground: '#073642',
      selectionText: '#839496',
      scrollbarTrack: '#002b36',
      scrollbarThumb: '#073642',
      scrollbarThumbHover: '#586e75',
      buttonBackground: '#073642',
      buttonHover: '#586e75',
      maximizeButton: '#859900',
      maximizeButtonHover: '#7b8a00',
    },
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    description: 'Tokyo Night inspired theme',
    colors: {
      background: '#1a1b26',
      terminalBackground: '#1a1b26',
      text: '#a9b1d6',
      terminalText: '#a9b1d6',
      terminalGreen: '#9ece6a',
      accent: '#7aa2f7',
      accentHover: '#bb9af7',
      border: '#414868',
      terminalBorder: '#414868',
      headerBackground: '#24283b',
      headerText: '#a9b1d6',
      inputText: '#a9b1d6',
      promptUser: '#7aa2f7',
      promptPath: '#f7768e',
      promptSeparator: '#a9b1d6',
      promptDollar: '#a9b1d6',
      selectionBackground: '#414868',
      selectionText: '#a9b1d6',
      scrollbarTrack: '#1a1b26',
      scrollbarThumb: '#414868',
      scrollbarThumbHover: '#565f89',
      buttonBackground: '#414868',
      buttonHover: '#565f89',
      maximizeButton: '#9ece6a',
      maximizeButtonHover: '#8ac863',
    },
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    description: 'Ubuntu terminal color scheme',
    colors: {
      background: '#300a24',
      terminalBackground: '#300a24',
      text: '#ffffff',
      terminalText: '#ffffff',
      terminalGreen: '#00ff00',
      accent: '#ff6600',
      accentHover: '#ff8800',
      border: '#4a0e35',
      terminalBorder: '#4a0e35',
      headerBackground: '#4a0e35',
      headerText: '#ffffff',
      inputText: '#ffffff',
      promptUser: '#ff6600',
      promptPath: '#ff6600',
      promptSeparator: '#ffffff',
      promptDollar: '#ffffff',
      selectionBackground: '#4a0e35',
      selectionText: '#ffffff',
      scrollbarTrack: '#300a24',
      scrollbarThumb: '#4a0e35',
      scrollbarThumbHover: '#6b1a4a',
      buttonBackground: '#4a0e35',
      buttonHover: '#6b1a4a',
      maximizeButton: '#00ff00',
      maximizeButtonHover: '#00cc00',
    },
  },
  {
    id: 'cobalt',
    name: 'Cobalt',
    description: 'Blue-tinted dark theme',
    colors: {
      background: '#002240',
      terminalBackground: '#002240',
      text: '#ffffff',
      terminalText: '#ffffff',
      terminalGreen: '#00ff9f',
      accent: '#0080ff',
      accentHover: '#00a0ff',
      border: '#003d6b',
      terminalBorder: '#003d6b',
      headerBackground: '#003d6b',
      headerText: '#ffffff',
      inputText: '#ffffff',
      promptUser: '#0080ff',
      promptPath: '#ff9d00',
      promptSeparator: '#ffffff',
      promptDollar: '#ffffff',
      selectionBackground: '#003d6b',
      selectionText: '#ffffff',
      scrollbarTrack: '#002240',
      scrollbarThumb: '#003d6b',
      scrollbarThumbHover: '#005a9e',
      buttonBackground: '#003d6b',
      buttonHover: '#005a9e',
      maximizeButton: '#00ff9f',
      maximizeButtonHover: '#00e68a',
    },
  },
];

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find(theme => theme.id === id);
};

export const getDefaultTheme = (): Theme => {
  return themes[2]; // Matrix theme as default
};

export const getThemeNames = (): string[] => {
  return themes.map(theme => theme.name);
};

export const getThemeIds = (): string[] => {
  return themes.map(theme => theme.id);
};
