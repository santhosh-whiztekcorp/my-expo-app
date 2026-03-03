import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

import { CustomText, type CustomTextProps } from '../../custom/custom-text';

export function Card({ className, ...props }: ViewProps) {
  return <View className={cn('overflow-hidden rounded-xl border border-border bg-card shadow-sm', className)} {...props} />;
}

export function CardHeader({ className, ...props }: ViewProps) {
  return <View className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />;
}

export function CardTitle({ className, ...props }: CustomTextProps) {
  return <CustomText variant="h3" className={cn('leading-none tracking-tight', className)} {...props} />;
}

export function CardDescription({ className, ...props }: CustomTextProps) {
  return <CustomText variant="span" className={cn('text-muted-foreground', className)} {...props} />;
}

export function CardContent({ className, ...props }: ViewProps) {
  return <View className={cn('p-6 pt-0', className)} {...props} />;
}

export function CardFooter({ className, ...props }: ViewProps) {
  return <View className={cn('flex flex-row items-center p-6 pt-0', className)} {...props} />;
}
