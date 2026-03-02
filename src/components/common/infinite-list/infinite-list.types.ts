import { FlatListProps } from 'react-native';

export type InfiniteListProps<T> = Omit<FlatListProps<T>, 'renderItem' | 'keyExtractor'> & {
  renderItem: ({ item }: { item: T }) => React.ReactElement | null;
  keyExtractor: (item: T) => string;
  loading?: boolean;
  loadingMore?: boolean;
  emptyText?: string;
};
