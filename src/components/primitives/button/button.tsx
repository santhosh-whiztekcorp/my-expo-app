import { forwardRef } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { cva } from 'class-variance-authority';
import { useColorScheme } from 'nativewind';

import { cn } from '@/lib/cn';

import { CustomText } from '../../custom/custom-text';
import { type ButtonProps } from './button.types';

export const buttonVariants = cva(
  'flex-row items-center justify-center border border-transparent gap-2 rounded-xl transition-all active:opacity-80 disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary border-primary',
        destructive: 'bg-destructive border-destructive',
        outline: 'border-border bg-transparent active:bg-accent',
        secondary: 'bg-secondary border-secondary',
        ghost: 'bg-transparent border-transparent active:bg-accent',
        link: 'bg-transparent border-transparent',
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

const buttonTextVariants = cva('text-center font-montserrat-semibold', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-accent-foreground',
      link: 'text-primary underline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const Button = forwardRef<View, ButtonProps>(function Button(
  { label, children, loading, variant, size, className, labelClassName, textVariant, labelProps, disabled, ...props },
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

  const defaultTextVariant = size === 'lg' ? 'h6' : size === 'sm' || size === 'xs' ? 'span' : 'p';

  return (
    <Pressable ref={ref} disabled={disabled || loading} className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {loading ? (
        <ActivityIndicator color={getIndicatorColor()} />
      ) : label ? (
        <CustomText
          variant={textVariant || defaultTextVariant}
          {...labelProps}
          className={cn(buttonTextVariants({ variant }), size === 'xs' && 'text-xs', labelClassName, labelProps?.className)}
        >
          {label}
        </CustomText>
      ) : (
        children
      )}
    </Pressable>
  );
});

Button.displayName = 'Button';
