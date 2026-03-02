import { create } from 'zustand';

import { ToastItem, ToastState, ToastType } from './toast.types';

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message: string, type: ToastType, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { id, message, type, duration };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },
  removeToast: (id: string) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
