import { Pressable } from 'react-native';

import { type CustomPressableProps } from './custom-pressable.types';

export function CustomPressable({ children, ...props }: CustomPressableProps) {
  return <Pressable {...props}>{children}</Pressable>;
}
