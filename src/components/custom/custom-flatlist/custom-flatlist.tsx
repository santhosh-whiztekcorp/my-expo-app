import { FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { CustomFlatlistProps } from './custom-flatlist.types';

export function CustomFlatlist<T>({ data, renderItem, keyExtractor, ...props }: CustomFlatlistProps<T>) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      renderScrollComponent={(scrollProps) => (
        <KeyboardAwareScrollView
          bottomOffset={10}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          {...scrollProps}
        />
      )}
      {...props}
    />
  );
}
