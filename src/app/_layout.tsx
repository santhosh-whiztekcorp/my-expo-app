import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import '../../global.css';

import { RootProvider } from '../components/providers';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/montserrat/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../assets/fonts/montserrat/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../assets/fonts/montserrat/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('../assets/fonts/montserrat/Montserrat-ExtraBold.ttf'),
    'Montserrat-Light': require('../assets/fonts/montserrat/Montserrat-Light.ttf'),
    'Montserrat-ExtraLight': require('../assets/fonts/montserrat/Montserrat-ExtraLight.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <RootProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </RootProvider>
  );
}
