import { useEffect, type ReactNode } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { APP_FONTS } from '@/constants/fonts';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function FontProvider({ children }: { children: ReactNode }) {
  const [loaded, error] = useFonts(APP_FONTS);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <>{children}</>;
}
