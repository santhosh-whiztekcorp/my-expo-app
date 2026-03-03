import React from 'react';
import { FlatList, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { cn } from '@/lib/cn';

import { CustomActivityIndicator } from '../../custom/custom-activity-indicator';
import { CustomText } from '../../custom/custom-text';
import { InfiniteListProps } from './infinite-list.types';

export function InfiniteList<T>({
  data,
  renderItem,
  keyExtractor,
  loading,
  loadingMore,
  emptyText = 'No data available',
  emptyTextProps,
  ListEmptyComponent,
  ListFooterComponent,
  onRefresh,
  refreshing,
  ...props
}: InfiniteListProps<T>) {
  const renderEmpty = () => {
    if (loading) {
      return (
        <View className="flex-1 items-center justify-center p-10">
          <CustomActivityIndicator />
        </View>
      );
    }

    if (ListEmptyComponent) {
      if (React.isValidElement(ListEmptyComponent)) return ListEmptyComponent;
      return <ListEmptyComponent />;
    }
    return (
      <View className="flex-1 items-center justify-center p-10">
        <CustomText {...emptyTextProps} className={cn('text-center text-muted-foreground', emptyTextProps?.className)}>
          {emptyText}
        </CustomText>
      </View>
    );
  };

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View className="p-4">
          <CustomActivityIndicator />
        </View>
      );
    }

    if (ListFooterComponent) {
      if (React.isValidElement(ListFooterComponent)) return ListFooterComponent;
      return <ListFooterComponent />;
    }

    return null;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      onRefresh={onRefresh}
      refreshing={refreshing}
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
