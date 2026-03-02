import { Image } from 'react-native';

import { type CustomImageProps } from './custom-image.types';

export function CustomImage({ ...props }: CustomImageProps) {
  return <Image {...props} />;
}
