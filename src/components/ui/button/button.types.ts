import { type PressableProps } from 'react-native';
import { type VariantProps } from 'class-variance-authority';

import { buttonVariants } from './button';

export type ButtonProps = PressableProps &
  VariantProps<typeof buttonVariants> & {
    label?: string;
    loading?: boolean;
    className?: string;
    labelClassName?: string;
  };
