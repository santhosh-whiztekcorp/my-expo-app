import { FlatListProps } from 'react-native';

export type CustomFlatlistProps<T> = Omit<FlatListProps<T>, 'renderItem' | 'keyExtractor'> & {
  renderItem: ({ item }: { item: T }) => React.ReactElement | null;
  keyExtractor: (item: T) => string;
};
