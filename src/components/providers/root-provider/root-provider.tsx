import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '@/config/query-client';

import { FontProvider } from '../font-provider';
import { ThemeProvider } from '../theme-provider';

export function RootProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    NavigationBar.setButtonStyleAsync('dark');
    NavigationBar.setBackgroundColorAsync('transparent');
  }, []);

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <FontProvider>
          <ThemeProvider>
            <SafeAreaProvider>
              <StatusBar style="auto" />
              <KeyboardProvider>{children}</KeyboardProvider>
            </SafeAreaProvider>
          </ThemeProvider>
        </FontProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
