import { Pressable, Text, View } from 'react-native';
import { X } from 'lucide-react-native';
import { MotiView } from 'moti';

import { useToastStore } from '@/store/toast';

import { TOAST_VARIANTS } from './toast.constants';
import { ToastProps } from './toast.types';

export function Toast({ id, message, type }: ToastProps) {
  const removeToast = useToastStore((state) => state.removeToast);
  const variant = TOAST_VARIANTS[type];
  const { Icon } = variant;

  return (
    <MotiView
      from={{ opacity: 0, translateY: -20, scale: 0.9 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`mx-4 mb-3 flex-row items-center rounded-xl border p-4 shadow-sm ${variant.containerClass}`}
    >
      <View className="mr-3">
        <Icon size={20} color={variant.iconColor} />
      </View>
      <Text className={`flex-1 text-sm font-medium ${variant.textClass}`}>{message}</Text>
      <Pressable onPress={() => removeToast(id)} className="ml-2 rounded-full p-1 active:bg-black/5">
        <X size={16} color={variant.iconColor} />
      </Pressable>
    </MotiView>
  );
}
