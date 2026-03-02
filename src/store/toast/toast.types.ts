export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastItem = {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
};

export type ToastState = {
  toasts: ToastItem[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
};
