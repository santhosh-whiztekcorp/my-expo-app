import { ScrollView } from 'react-native';

import { type CustomScrollViewProps } from './custom-scroll-view.types';

export function CustomScrollView({ children, showsVerticalScrollIndicator = false, ...props }: CustomScrollViewProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={showsVerticalScrollIndicator} {...props}>
      {children}
    </ScrollView>
  );
}
