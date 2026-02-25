import { forwardRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import { cn } from '@/lib/cn';

import { type InputProps } from './input.types';

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { className, secureTextEntry, containerClassName, error, ...props },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);
  const { colorScheme } = useColorScheme();
  const isPassword = secureTextEntry;

  // Resolve HSL values for native props that don't support CSS variables
  const mutedForegroundColor = colorScheme === 'dark' ? 'hsl(24, 5.4%, 63.9%)' : 'hsl(25, 5.3%, 44.7%)';

  return (
    <View className={cn('relative w-full', containerClassName)}>
      <TextInput
        ref={ref}
        secureTextEntry={isPassword && !showPassword}
        className={cn(
          'h-12 w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground transition-all focus:border-ring',
          'disabled:opacity-50 dark:bg-input/30',
          isPassword && 'pr-12',
          error && 'border-destructive focus:border-destructive',
          className,
        )}
        placeholderTextColor={mutedForegroundColor}
        {...props}
      />
      {isPassword && (
        <Pressable
          onPress={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
          hitSlop={10}
        >
          {showPassword ? (
            <EyeOffIcon size={20} color={mutedForegroundColor} />
          ) : (
            <EyeIcon size={20} color={mutedForegroundColor} />
          )}
        </Pressable>
      )}
    </View>
  );
});

Input.displayName = 'Input';
