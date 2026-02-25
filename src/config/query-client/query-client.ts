import { QueryClient } from '@tanstack/react-query';

import { QUERY_CLIENT_CONSTANTS } from './query-client.constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CLIENT_CONSTANTS.STALE_TIME,
      gcTime: QUERY_CLIENT_CONSTANTS.GC_TIME,
      retry: (failureCount, error) => {
        const query = queryClient
          .getQueryCache()
          .getAll()
          .find((q) => q.state.error === error);

        const queryKey = query?.queryKey?.[0] as string;

        if (queryKey && (QUERY_CLIENT_CONSTANTS.NO_RETRY_QUERY_KEYS as readonly string[]).includes(queryKey)) {
          return false;
        }

        return failureCount < QUERY_CLIENT_CONSTANTS.RETRY_COUNT;
      },
    },
  },
});
