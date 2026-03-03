import { Text, View } from 'react-native';
import { MotiView } from 'moti';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { cn } from '@/lib/cn';

import { TOAST_VARIANTS } from './toast.constants';
import { useToastGesture } from './toast.hooks';
import { ToastProps } from './toast.types';

export function Toast({ id, message, type }: ToastProps) {
  const { gesture, animatedStyle } = useToastGesture(id);
  const variant = TOAST_VARIANTS[type];
  const { Icon } = variant;

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle}>
        <MotiView
          from={{ opacity: 0, translateY: -20, scale: 0.9 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={cn('mx-4 mb-3 flex-row items-center rounded-2xl border border-l-2 p-4 shadow-sm', variant.containerClass)}
        >
          <View className="mr-3">
            <Icon size={22} color={variant.iconColor} />
          </View>
          <Text className={cn('text-md flex-1 font-bold', variant.textClass)}>{message}</Text>
        </MotiView>
      </Animated.View>
    </GestureDetector>
  );
}
