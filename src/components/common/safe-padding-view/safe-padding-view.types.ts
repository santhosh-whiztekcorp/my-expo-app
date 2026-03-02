import { ViewProps } from 'react-native';

export type SafePaddingViewProps = ViewProps & {
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  extra?: number;
  extraHorizontal?: number;
  extraVertical?: number;
  extraTop?: number;
  extraBottom?: number;
  extraLeft?: number;
  extraRight?: number;
};
