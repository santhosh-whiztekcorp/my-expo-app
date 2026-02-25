import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { type CustomKeyboardAvoidingViewProps } from './custom-keyboard-avoiding-view.types';

export function CustomKeyboardAvoidingView({ children, ...props }: CustomKeyboardAvoidingViewProps) {
  return <KeyboardAvoidingView {...props}>{children}</KeyboardAvoidingView>;
}
