import { QueryKey } from '@tanstack/react-query';

import { QUERY_CLIENT_CONSTANTS } from './query-client.constants';

export type QueryKeyName = keyof typeof QUERY_CLIENT_CONSTANTS.QUERY_KEYS;

export type Identifiable = {
  id: string | number;
};

export type InvalidateAppQueriesArgs = {
  keys: QueryKeyName[];
};

export type UpsertAppCacheListArgs<T extends Identifiable> = {
  queryKey: QueryKey;
  item: T;
  position?: 'start' | 'end';
};

export type RemoveFromAppCacheListArgs = {
  queryKey: QueryKey;
  id: string | number;
};

export type UpdateAppCacheItemArgs<T> = {
  queryKey: QueryKey;
  updatedData: Partial<T>;
};

export type UpsertAppCacheInfiniteListArgs<T extends Identifiable> = {
  queryKey: QueryKey;
  item: T;
};

export type RemoveFromAppCacheInfiniteListArgs = {
  queryKey: QueryKey;
  id: string | number;
};
