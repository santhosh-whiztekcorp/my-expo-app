import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        {children}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
