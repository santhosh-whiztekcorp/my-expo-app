import { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useColorScheme } from 'nativewind';

import { cn } from '@/lib/cn';
import { useThemeStore } from '@/store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(useThemeStore.persist.hasHydrated());
  const theme = useThemeStore((state) => state.theme);
  const { setColorScheme, colorScheme } = useColorScheme();

  useEffect(() => {
    if (hydrated) return;
    return useThemeStore.persist.onFinishHydration(() => setHydrated(true));
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setColorScheme(theme);
  }, [hydrated, theme, setColorScheme]);

  useEffect(() => {
    const isDark = colorScheme === 'dark';
    NavigationBar.setBackgroundColorAsync('transparent');
    NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
  }, [colorScheme]);

  if (!hydrated) return null;

  return <View className={cn('flex-1 font-montserrat', colorScheme === 'dark' && 'dark')}>{children}</View>;
}
