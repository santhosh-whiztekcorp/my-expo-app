import { Stack } from 'expo-router';
import '../../global.css';
import { RootProvider } from '../components/providers';

export default function RootLayout() {
  return (
    <RootProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </RootProvider>
  );
}
