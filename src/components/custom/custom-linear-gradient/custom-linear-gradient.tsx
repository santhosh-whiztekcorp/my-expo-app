import { LinearGradient } from 'expo-linear-gradient';

import { type CustomLinearGradientProps } from './custom-linear-gradient.types';
import { getDirectionPoints } from './custom-linear-gradient.utils';

export function CustomLinearGradient({ children, direction, start, end, ...props }: CustomLinearGradientProps) {
  const directionPoints = getDirectionPoints(direction);

  return (
    <LinearGradient start={start ?? directionPoints.start} end={end ?? directionPoints.end} {...props}>
      {children}
    </LinearGradient>
  );
}
