import { ActivityIndicator } from 'react-native';

import { type CustomActivityIndicatorProps } from './custom-activity-indicator.types';

export function CustomActivityIndicator({ ...props }: CustomActivityIndicatorProps) {
  return <ActivityIndicator {...props} />;
}
