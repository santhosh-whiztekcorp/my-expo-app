import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '@/config/query-client';

import { FontProvider } from './font-provider';
import { NotificationProvider } from './notification-provider';
import { ThemeProvider } from './theme-provider';
import { ToastProvider } from './toast-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <FontProvider>
          <ThemeProvider>
            <SafeAreaProvider>
              <StatusBar style="auto" />
              <KeyboardProvider>
                <NotificationProvider>{children}</NotificationProvider>
                <ToastProvider />
              </KeyboardProvider>
            </SafeAreaProvider>
          </ThemeProvider>
        </FontProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
