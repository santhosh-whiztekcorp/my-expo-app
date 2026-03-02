import { View } from 'react-native';
import { AnimatePresence } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useToastStore } from '@/store/toast';

import { Toast } from '../../common/toast/toast';

export function ToastProvider() {
  const toasts = useToastStore((state) => state.toasts);
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        top: insets.top + 10,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </View>
  );
}
