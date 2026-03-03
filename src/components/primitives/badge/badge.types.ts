import { type ViewProps } from 'react-native';
import { type VariantProps } from 'class-variance-authority';

import { type CustomTextProps } from '../../custom/custom-text';
import { badgeVariants } from './badge';

export interface BadgeProps extends ViewProps, VariantProps<typeof badgeVariants> {
  label?: string;
  labelProps?: Partial<CustomTextProps>;
}
