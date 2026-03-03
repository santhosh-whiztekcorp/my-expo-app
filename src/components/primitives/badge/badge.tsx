import { View } from 'react-native';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

import { CustomText } from '../../custom/custom-text';
import { type BadgeProps } from './badge.types';

export const badgeVariants = cva(
  'inline-flex flex-row items-center rounded-full border border-transparent px-2.5 py-0.5 transition-all',
  {
    variants: {
      variant: {
        default: 'bg-primary border-transparent',
        secondary: 'bg-secondary border-transparent',
        destructive: 'bg-destructive border-transparent',
        outline: 'border-border bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const badgeTextVariants = cva('text-xs font-semibold', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export function Badge({ className, variant, label, labelProps, children, ...props }: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      {label ? (
        <CustomText variant="span" {...labelProps} className={cn(badgeTextVariants({ variant }), labelProps?.className)}>
          {label}
        </CustomText>
      ) : typeof children === 'string' ? (
        <CustomText variant="span" className={cn(badgeTextVariants({ variant }))}>
          {children}
        </CustomText>
      ) : (
        children
      )}
    </View>
  );
}
