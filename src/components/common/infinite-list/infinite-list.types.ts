import { FlatListProps } from 'react-native';

import { type CustomTextProps } from '../../custom/custom-text';

export type InfiniteListProps<T> = Omit<FlatListProps<T>, 'renderItem' | 'keyExtractor'> & {
  renderItem: ({ item }: { item: T }) => React.ReactElement | null;
  keyExtractor: (item: T) => string;
  loading?: boolean;
  loadingMore?: boolean;
  emptyText?: string;
  emptyTextProps?: Partial<CustomTextProps>;
};
