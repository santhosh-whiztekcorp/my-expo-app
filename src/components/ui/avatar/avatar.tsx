import { useState } from 'react';
import { Image, Text, View, type ImageProps, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

import { type AvatarProps } from './avatar.types';

export function Avatar({ className, size = 'default', ...props }: AvatarProps) {
  const sizeClasses = {
    default: 'size-10',
    sm: 'size-8',
    lg: 'size-12',
  };

  return (
    <View
      className={cn('relative flex shrink-0 overflow-hidden rounded-full bg-muted', sizeClasses[size], className)}
      {...props}
    />
  );
}

export function AvatarImage({ className, source, ...props }: ImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !source) return null;

  return (
    <Image className={cn('aspect-square size-full', className)} source={source} onError={() => setHasError(true)} {...props} />
  );
}

export function AvatarFallback({ className, children, ...props }: ViewProps) {
  return (
    <View className={cn('flex size-full items-center justify-center rounded-full bg-muted', className)} {...props}>
      {typeof children === 'string' ? (
        <Text className="text-sm font-medium uppercase text-muted-foreground">{children.substring(0, 2)}</Text>
      ) : (
        children
      )}
    </View>
  );
}
