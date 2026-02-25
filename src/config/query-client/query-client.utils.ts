import { InfiniteData } from '@tanstack/react-query';

import { queryClient } from './query-client';
import { QUERY_CLIENT_CONSTANTS } from './query-client.constants';
import {
  Identifiable,
  InvalidateAppQueriesArgs,
  RemoveFromAppCacheInfiniteListArgs,
  RemoveFromAppCacheListArgs,
  UpdateAppCacheItemArgs,
  UpsertAppCacheInfiniteListArgs,
  UpsertAppCacheListArgs,
} from './query-client.types';

export const invalidateAppQueries = async (args: InvalidateAppQueriesArgs) => {
  const { keys } = args;

  return Promise.all(
    keys.map((key) =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_CLIENT_CONSTANTS.QUERY_KEYS[key]],
      }),
    ),
  );
};

export const upsertAppCacheList = <T extends Identifiable>(args: UpsertAppCacheListArgs<T>) => {
  const { queryKey, item, position = 'start' } = args;

  queryClient.setQueryData<T[]>(queryKey, (oldData) => {
    if (!oldData) return [item];

    const exists = oldData.some((existingItem) => existingItem.id === item.id);

    if (exists) {
      return oldData.map((existingItem) => (existingItem.id === item.id ? item : existingItem));
    }

    return position === 'start' ? [item, ...oldData] : [...oldData, item];
  });
};

export const removeFromAppCacheList = (args: RemoveFromAppCacheListArgs) => {
  const { queryKey, id } = args;

  queryClient.setQueryData<Identifiable[]>(queryKey, (oldData) => {
    if (!oldData) return [];
    return oldData.filter((existingItem) => existingItem.id !== id);
  });
};

export const updateAppCacheItem = <T>(args: UpdateAppCacheItemArgs<T>) => {
  const { queryKey, updatedData } = args;

  queryClient.setQueryData<T>(queryKey, (oldData) => {
    if (!oldData) return undefined;
    return { ...oldData, ...updatedData };
  });
};

export const upsertAppCacheInfiniteList = <T extends Identifiable>(args: UpsertAppCacheInfiniteListArgs<T>) => {
  const { queryKey, item } = args;

  queryClient.setQueryData<InfiniteData<T[]>>(queryKey, (oldData) => {
    if (!oldData) return undefined;

    let found = false;
    const newPages = oldData.pages.map((page) => {
      if (page.some((existingItem) => existingItem.id === item.id)) {
        found = true;
        return page.map((existingItem) => (existingItem.id === item.id ? item : existingItem));
      }
      return page;
    });

    if (found) {
      return { ...oldData, pages: newPages };
    }

    return {
      ...oldData,
      pages: [[item, ...oldData.pages[0]], ...oldData.pages.slice(1)],
    };
  });
};

export const removeFromAppCacheInfiniteList = (args: RemoveFromAppCacheInfiniteListArgs) => {
  const { queryKey, id } = args;

  queryClient.setQueryData<InfiniteData<Identifiable[]>>(queryKey, (oldData) => {
    if (!oldData) return undefined;

    return {
      ...oldData,
      pages: oldData.pages.map((page) => page.filter((existingItem) => existingItem.id !== id)),
    };
  });
};
