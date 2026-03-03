import { TextProps } from 'react-native';

export type CustomTextVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type CustomTextProps = TextProps & {
  variant?: CustomTextVariants;
  className?: string;
};
