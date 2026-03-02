import { SafeAreaView } from 'react-native-safe-area-context';

import { type CustomSafeAreaViewProps } from './custom-safe-area-view.types';

export function CustomSafeAreaView({ children, ...props }: CustomSafeAreaViewProps) {
  return <SafeAreaView {...props}>{children}</SafeAreaView>;
}
