import { forwardRef } from 'react';
import { Text } from 'react-native';

import { cn } from '@/lib/cn';

import { CustomTextProps } from './custom-text.types';
import { getCustomTextClasses } from './custom-text.utils';

export const CustomText = forwardRef<Text, CustomTextProps>(({ children, variant = 'p', className, ...props }, ref) => {
  return (
    <Text ref={ref} className={cn(getCustomTextClasses(variant), className)} {...props}>
      {children}
    </Text>
  );
});

CustomText.displayName = 'CustomText';
