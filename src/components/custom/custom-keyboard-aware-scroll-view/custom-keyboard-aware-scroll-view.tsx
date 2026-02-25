import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { cn } from '@/lib/cn';

import { type CustomKeyboardAwareScrollViewProps } from './custom-keyboard-aware-scroll-view.types';

export function CustomKeyboardAwareScrollView({
  children,
  bottomOffset = 10,
  contentContainerClassName,
  showsVerticalScrollIndicator = false,
  keyboardShouldPersistTaps = 'handled',
  ...props
}: CustomKeyboardAwareScrollViewProps) {
  return (
    <KeyboardAwareScrollView
      bottomOffset={bottomOffset}
      contentContainerClassName={cn('flex-grow', contentContainerClassName)}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
