import { type PressableProps } from 'react-native';
import { type VariantProps } from 'class-variance-authority';

import { type CustomTextProps, type CustomTextVariants } from '../../custom/custom-text';
import { buttonVariants } from './button';

export type ButtonProps = PressableProps &
  VariantProps<typeof buttonVariants> & {
    label?: string;
    loading?: boolean;
    className?: string;
    labelClassName?: string;
    textVariant?: CustomTextVariants;
    labelProps?: Partial<CustomTextProps>;
  };
