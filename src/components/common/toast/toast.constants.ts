import { AlertCircle, CheckCircle2, Info } from 'lucide-react-native';

export const TOAST_VARIANTS = {
  success: {
    containerClass: 'bg-green-50 border-green-200',
    textClass: 'text-green-800',
    Icon: CheckCircle2,
    iconColor: '#16a34a',
  },
  error: {
    containerClass: 'bg-red-50 border-red-200',
    textClass: 'text-red-800',
    Icon: AlertCircle,
    iconColor: '#dc2626',
  },
  info: {
    containerClass: 'bg-blue-50 border-blue-200',
    textClass: 'text-blue-800',
    Icon: Info,
    iconColor: '#2563eb',
  },
  warning: {
    containerClass: 'bg-amber-50 border-amber-200',
    textClass: 'text-amber-800',
    Icon: AlertCircle,
    iconColor: '#d97706',
  },
} as const;
