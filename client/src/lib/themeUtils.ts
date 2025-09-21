import { themes, getThemeById, getDefaultTheme, type Theme } from './themes';

const THEME_STORAGE_KEY = 'terminal-theme';

/**
 * Apply a theme by updating CSS custom properties
 */
export const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;

  // Apply all theme colors as CSS custom properties
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  });
};

/**
 * Get the current theme from localStorage or return default
 */
export const getCurrentTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return getDefaultTheme();
  }

  const storedThemeId = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedThemeId) {
    const theme = getThemeById(storedThemeId);
    if (theme) {
      return theme;
    }
  }

  return getDefaultTheme();
};

/**
 * Save theme to localStorage
 */
export const saveTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(THEME_STORAGE_KEY, theme.id);
};

/**
 * Switch to a theme by ID
 */
export const switchTheme = (themeId: string): Theme | null => {
  const theme = getThemeById(themeId);
  if (theme) {
    applyTheme(theme);
    saveTheme(theme);
    return theme;
  }
  return null;
};

/**
 * Get all available themes
 */
export const getAvailableThemes = (): Theme[] => {
  return themes;
};

/**
 * Initialize theme on app startup
 */
export const initializeTheme = (): Theme => {
  const theme = getCurrentTheme();
  applyTheme(theme);
  return theme;
};

/**
 * Get theme by name (case-insensitive)
 */
export const getThemeByName = (name: string): Theme | undefined => {
  return themes.find(theme => theme.name.toLowerCase() === name.toLowerCase());
};

/**
 * Search themes by name or description
 */
export const searchThemes = (query: string): Theme[] => {
  const lowercaseQuery = query.toLowerCase();
  return themes.filter(
    theme =>
      theme.name.toLowerCase().includes(lowercaseQuery) ||
      theme.description.toLowerCase().includes(lowercaseQuery) ||
      theme.id.toLowerCase().includes(lowercaseQuery)
  );
};
