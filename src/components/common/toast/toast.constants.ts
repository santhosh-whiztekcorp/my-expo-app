import { AlertCircle, CheckCircle2, Info } from 'lucide-react-native';

export const TOAST_VARIANTS = {
  success: {
    containerClass: 'bg-green-200 border-green-500',
    textClass: 'text-green-600',
    Icon: CheckCircle2,
    iconColor: '#16a34a',
  },
  error: {
    containerClass: 'bg-red-200 border-red-500',
    textClass: 'text-red-600',
    Icon: AlertCircle,
    iconColor: '#dc2626',
  },
  info: {
    containerClass: 'bg-blue-200 border-blue-500',
    textClass: 'text-blue-600',
    Icon: Info,
    iconColor: '#2563eb',
  },
  warning: {
    containerClass: 'bg-amber-200 border-amber-500',
    textClass: 'text-amber-600',
    Icon: AlertCircle,
    iconColor: '#d97706',
  },
} as const;
