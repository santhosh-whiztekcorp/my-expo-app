# Query Client Documentation

## Module Overview

The application uses **TanStack Query (React Query)** for asynchronous state management. It provides a robust layer for data fetching, caching, and synchronization between the server and the UI.

### Key Capabilities

- **Automated Caching**: Manages data freshness and garbage collection globally.
- **Smart Retries**: Handles transient network failures with a configurable retry policy.
- **Background Synchronization**: Keeps the UI in sync with server state without manual intervention.

## Maintenance & Extension Guide

We maintain a strict separation between global configuration and specific query implementations to ensure the core client remains stable.

### How to make changes:

- **Updating Global Defaults**: Modify `STALE_TIME`, `GC_TIME`, or `RETRY_COUNT` in `src/config/query-client/query-client.constants.ts`.
- **Excluding Specific Queries from Retries**: To prevent retries for specific actions (e.g., login or non-idempotent requests), add the `queryKey` prefix to `NO_RETRY_QUERY_KEYS` in `query-client.constants.ts`.
- **Managing Query Keys**: Define shared `queryKeys` in `src/config/query-client/query-client.constants.ts` under the `QUERY_KEYS` object. Module-specific keys should live within their own module constants.
- **Global Query Utilities**: Logic for invalidating queries or updating cache data that is used across multiple modules belongs in `src/config/query-client/query-client.utils.ts`.

### Manual Cache Updates vs. Invalidation

While `invalidateAppQueries` is simple, it triggers a new network request. For better performance after mutations, use our manual update utilities:

- **Adding/Updating in Lists**: Use `upsertAppCacheList(key, item)` after a `POST` or `PUT`.
- **Deleting from Lists**: Use `removeFromAppCacheList(key, id)` after a `DELETE`.
- **Single Entity Update**: Use `updateAppCacheItem(key, data)` to patch a specific item's cache (usually from a detail view).

> [!TIP]
> Use manual updates for a "snappy" UI experience where the change is reflected instantly without a loading spinner. Only fallback to invalidation if the list order is complex (e.g., server-side sorting) or affected by many other entities.

## Technical Deep Dive

### Client Configuration

The `QueryClient` is initialized with default options that govern all queries in the application:

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CLIENT_CONSTANTS.STALE_TIME,
      gcTime: QUERY_CLIENT_CONSTANTS.GC_TIME,
      retry: (failureCount, error) => {
        // Logic to check NO_RETRY_QUERY_KEYS
        // ...
        return failureCount < QUERY_CLIENT_CONSTANTS.RETRY_COUNT;
      },
    },
  },
});
```

### Conditional Retry Logic

The retry policy is dynamic. It inspects the `queryKey` of the failing query. If the key starts with an entry in the `NO_RETRY_QUERY_KEYS` list, the retry is immediately aborted (`return false`), regardless of the failure count.

### Integration

The client is injected into the React context via `QueryClientProvider` at the very top of the component tree, ensuring all features have access to the same cache.

## Usage Examples

### Manual Cache Updates (Recommended for POST/PUT/DELETE)

```typescript
import { useMutation } from '@tanstack/react-query';

import { QUERY_CLIENT_CONSTANTS } from '@/config/query-client/query-client.constants';
import { removeFromAppCacheList, upsertAppCacheList } from '@/config/query-client/query-client.utils';

// Example: Adding a new post
const useCreatePost = () => {
  return useMutation({
    mutationFn: createPostApi,
    onSuccess: (newPost) => {
      upsertAppCacheList({
        queryKey: [QUERY_CLIENT_CONSTANTS.QUERY_KEYS.POSTS],
        newItem: newPost,
        position: 'start', // Optional: Adds to the top
      });
    },
  });
};

// Example: Deleting a post
const useDeletePost = () => {
  return useMutation({
    mutationFn: deletePostApi,
    onSuccess: (_, postId) => {
      removeFromAppCacheList({
        queryKey: [QUERY_CLIENT_CONSTANTS.QUERY_KEYS.POSTS],
        id: postId,
      });
    },
  });
};
```

### Infinite Query Cache Updates

```typescript
import { removeFromAppCacheInfiniteList, upsertAppCacheInfiniteList } from '@/config/query-client/query-client.utils';

// Usage is almost identical to list helpers but handles InfiniteData internal structure
upsertAppCacheInfiniteList({
  queryKey: [QUERY_CLIENT_CONSTANTS.QUERY_KEYS.POSTS],
  newItem: updatedPost,
});
```

### Batch Invalidation (Fallback)

Use this when the server returns complex sorted data or when many entities are affected.

```typescript
import { invalidateAppQueries } from '@/config/query-client/query-client.utils';

// Invalidating multiple keys at once
const handleLogout = async () => {
  await invalidateAppQueries({
    keys: ['AUTH', 'USER'],
  });
};
```

<br>
--- Last Updated: 2026-02-25 ---
