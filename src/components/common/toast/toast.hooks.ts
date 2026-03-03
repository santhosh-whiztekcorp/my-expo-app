import { useMemo } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { useToastStore } from '@/store/toast';

import { SWIPE_THRESHOLD } from './toast.constants';

export function useToastGesture(id: string) {
  const removeToast = useToastStore((state) => state.removeToast);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((event) => {
          translateX.value = event.translationX;
        })
        .onEnd((event) => {
          if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
            translateX.value = withTiming(event.translationX > 0 ? 500 : -500, { duration: 200 });
            opacity.value = withTiming(0, { duration: 200 }, () => {
              scheduleOnRN(removeToast, id);
            });
          } else {
            translateX.value = withSpring(0);
          }
        }),
    [id, removeToast, translateX, opacity],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return { gesture, animatedStyle, removeToast };
}
