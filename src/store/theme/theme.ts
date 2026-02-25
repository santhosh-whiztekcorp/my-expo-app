import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { THEME_STORAGE_KEY } from './theme.constants';
import { Theme, ThemeState } from './theme.types';
import { SecureStorage } from './theme.utils';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      setTheme: (theme: Theme) => set({ theme }),
      toggleTheme: () => {
        const currentTheme = get().theme;
        const nextTheme: Theme = currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'system' : 'light';
        set({ theme: nextTheme });
      },
    }),
    {
      name: THEME_STORAGE_KEY,
      storage: createJSONStorage(() => SecureStorage),
    },
  ),
);
