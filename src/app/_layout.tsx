import { Stack } from 'expo-router';

import { Providers } from '../components/providers';

import '../../global.css';

export default function RootLayout() {
  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
    </Providers>
  );
}
