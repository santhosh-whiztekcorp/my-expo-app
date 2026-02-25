export type Theme = 'light' | 'dark' | 'system';

export type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};
