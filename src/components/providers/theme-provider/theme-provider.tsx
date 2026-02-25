import { useEffect } from 'react';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { cn } from '@/lib/cn';
import { useThemeStore } from '@/store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);
  const { setColorScheme, colorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(theme);
  }, [theme, setColorScheme]);

  return <View className={cn('flex-1 font-montserrat', colorScheme === 'dark' && 'dark')}>{children}</View>;
}
