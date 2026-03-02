import { type LinearGradientProps } from 'expo-linear-gradient';

export type GradientDirection =
  | 'to-top'
  | 'to-bottom'
  | 'to-left'
  | 'to-right'
  | 'to-top-right'
  | 'to-top-left'
  | 'to-bottom-right'
  | 'to-bottom-left';

export type CustomLinearGradientProps = LinearGradientProps & {
  direction?: GradientDirection;
};
