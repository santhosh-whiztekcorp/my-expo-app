import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type SafePaddingViewProps } from './safe-padding-view.types';

export function SafePaddingView({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  extra = 0,
  extraHorizontal = 0,
  extraVertical = 0,
  extraTop = 0,
  extraBottom = 0,
  extraLeft = 0,
  extraRight = 0,
  style,
  ...props
}: SafePaddingViewProps) {
  const insets = useSafeAreaInsets();

  const paddingStyle = {
    paddingTop: (edges.includes('top') ? insets.top : 0) + (extraTop ?? extraVertical ?? extra ?? 0),
    paddingBottom: (edges.includes('bottom') ? insets.bottom : 0) + (extraBottom ?? extraVertical ?? extra ?? 0),
    paddingLeft: (edges.includes('left') ? insets.left : 0) + (extraLeft ?? extraHorizontal ?? extra ?? 0),
    paddingRight: (edges.includes('right') ? insets.right : 0) + (extraRight ?? extraHorizontal ?? extra ?? 0),
  };

  return (
    <View style={[paddingStyle, style]} {...props}>
      {children}
    </View>
  );
}
