import { memo, useMemo } from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { GestureDetector } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { cn } from '@/lib/cn';

import { CustomText } from '../../custom/custom-text';
import { TOAST_VARIANTS } from './toast.constants';
import { useToastGesture } from './toast.hooks';
import { ToastProps } from './toast.types';

export const Toast = memo(function Toast({ id, message, type }: ToastProps) {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const { gesture } = useToastGesture(id, translateX, opacity);

  const variant = useMemo(() => TOAST_VARIANTS[type], [type]);
  const { Icon } = variant;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={gesture}>
      <MotiView
        style={animatedStyle}
        from={{ opacity: 0, translateY: -20, scale: 0.9 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={cn('mx-4 mb-3 flex-row items-center rounded-xl border border-l-2 p-4 shadow-sm', variant.containerClass)}
      >
        <View className="mr-3">
          <Icon size={22} color={variant.iconColor} />
        </View>
        <CustomText className={cn('text-md flex-1 font-bold', variant.textClass)}>{message}</CustomText>
      </MotiView>
    </GestureDetector>
  );
});
