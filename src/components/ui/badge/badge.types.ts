import { type ViewProps } from 'react-native';
import { type VariantProps } from 'class-variance-authority';

import { badgeVariants } from './badge';

export interface BadgeProps extends ViewProps, VariantProps<typeof badgeVariants> {
  label?: string;
}
