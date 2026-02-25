import { forwardRef } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { cva } from 'class-variance-authority';
import { useColorScheme } from 'nativewind';

import { cn } from '@/lib/cn';

import { type ButtonProps } from './button.types';

export const buttonVariants = cva(
  'flex-row items-center justify-center gap-2 rounded-xl transition-all active:opacity-80 disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        destructive: 'bg-destructive',
        outline: 'border border-border bg-transparent active:bg-accent',
        secondary: 'bg-secondary',
        ghost: 'bg-transparent active:bg-accent',
        link: 'bg-transparent',
      },
      size: {
        default: 'h-12 px-6 py-3',
        xs: 'h-8 px-3 rounded-lg',
        sm: 'h-10 px-4 rounded-lg',
        lg: 'h-14 px-8 rounded-xl',
        icon: 'size-12 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const buttonTextVariants = cva('text-center font-semibold text-base', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-accent-foreground',
      link: 'text-primary underline',
    },
    size: {
      default: 'text-base',
      xs: 'text-xs',
      sm: 'text-sm',
      lg: 'text-lg',
      icon: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const Button = forwardRef<View, ButtonProps>(function Button(
  { label, children, loading, variant, size, className, labelClassName, disabled, ...props },
  ref,
) {
  const { colorScheme } = useColorScheme();

  const getIndicatorColor = () => {
    // Resolve HSL values for ActivityIndicator color prop (doesn't support CSS variables)
    if (variant === 'outline' || variant === 'ghost' || variant === 'link') {
      return colorScheme === 'dark' ? 'hsl(60, 9.1%, 97.8%)' : 'hsl(20, 14.3%, 4.1%)';
    }
    return 'hsl(26, 83.3%, 14.1%)'; // primary-foreground
  };

  return (
    <Pressable ref={ref} disabled={disabled || loading} className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {loading ? (
        <ActivityIndicator color={getIndicatorColor()} />
      ) : label ? (
        <Text className={cn(buttonTextVariants({ variant, size, className: labelClassName }))}>{label}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
});

Button.displayName = 'Button';
