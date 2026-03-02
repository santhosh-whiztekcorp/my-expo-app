# Query Client Documentation

## Overview

The application uses **TanStack Query (React Query)** for all asynchronous server state. It provides a structured layer for data fetching, caching, and UI synchronisation.

**Location**: `src/config/query-client/`

| File                        | Responsibility                                                              |
| --------------------------- | --------------------------------------------------------------------------- |
| `query-client.ts`           | `QueryClient` instance and default options                                  |
| `query-client.constants.ts` | `STALE_TIME`, `GC_TIME`, `RETRY_COUNT`, `QUERY_KEYS`, `NO_RETRY_QUERY_KEYS` |
| `query-client.utils.ts`     | Cache helpers: upsert, remove, invalidate                                   |
| `query-client.types.ts`     | Shared types for cache utility helpers                                      |

## Core Capabilities

- **Automated Caching**: Manages data freshness (`staleTime`) and garbage collection (`gcTime`) globally.
- **Smart Retries**: Configurable retry policy with per-query-key opt-out via `NO_RETRY_QUERY_KEYS`.
- **Manual Cache Updates**: Utility helpers to update the cache instantly after mutations, avoiding unnecessary network re-fetches.
- **Background Synchronisation**: Keeps UI in sync with server state without manual intervention.

## Technical Deep Dive

### Client Configuration

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CLIENT_CONSTANTS.STALE_TIME,
      gcTime: QUERY_CLIENT_CONSTANTS.GC_TIME,
      retry: (failureCount, error) => {
        // Aborts retry immediately for keys in NO_RETRY_QUERY_KEYS
        return failureCount < QUERY_CLIENT_CONSTANTS.RETRY_COUNT;
      },
    },
  },
});
```

### Conditional Retry Logic

The retry function inspects the `queryKey` of the failing query. If the key's prefix matches an entry in `NO_RETRY_QUERY_KEYS`, retries are aborted immediately (`return false`). Use this for non-idempotent operations like login or payment mutations.

### Manual Cache Updates vs. Invalidation

| Approach                 | When to use                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `upsertAppCacheList`     | After `POST` / `PUT` — add or update item in a list                                   |
| `removeFromAppCacheList` | After `DELETE` — remove item from a list by ID                                        |
| `updateAppCacheItem`     | After fetching a detail view — patch a single cached entity                           |
| `invalidateAppQueries`   | Fallback when server-side sorting or complex relations make manual update impractical |

> [!TIP]
> Prefer manual cache updates for an instant, flicker-free UI. Only use invalidation when the updated list order depends on server logic you can't replicate locally.

## Usage Examples

### Manual Cache Update (POST / PUT)

```typescript
import { useMutation } from '@tanstack/react-query';

import { QUERY_CLIENT_CONSTANTS } from '@/config/query-client/query-client.constants';
import { upsertAppCacheList } from '@/config/query-client/query-client.utils';

const useCreatePost = () =>
  useMutation({
    mutationFn: createPostApi,
    onSuccess: (newPost) => {
      upsertAppCacheList({
        queryKey: [QUERY_CLIENT_CONSTANTS.QUERY_KEYS.POSTS],
        newItem: newPost,
        position: 'start',
      });
    },
  });
```

### Manual Cache Update (DELETE)

```typescript
import { removeFromAppCacheList } from '@/config/query-client/query-client.utils';

const useDeletePost = () =>
  useMutation({
    mutationFn: deletePostApi,
    onSuccess: (_, postId) => {
      removeFromAppCacheList({
        queryKey: [QUERY_CLIENT_CONSTANTS.QUERY_KEYS.POSTS],
        id: postId,
      });
    },
  });
```

### Infinite Query Cache Update

```typescript
import { upsertAppCacheInfiniteList } from '@/config/query-client/query-client.utils';

upsertAppCacheInfiniteList({
  queryKey: [QUERY_CLIENT_CONSTANTS.QUERY_KEYS.POSTS],
  newItem: updatedPost,
});
```

### Batch Invalidation (Fallback)

```typescript
import { invalidateAppQueries } from '@/config/query-client/query-client.utils';

await invalidateAppQueries({ keys: ['AUTH', 'USER'] });
```

## Maintenance & Extension Guide

- **Update global defaults**: Edit `STALE_TIME`, `GC_TIME`, or `RETRY_COUNT` in `query-client.constants.ts`.
- **Disable retries for a specific query**: Add its `queryKey` prefix to `NO_RETRY_QUERY_KEYS` in `query-client.constants.ts`.
- **Add shared query keys**: Define them in `QUERY_KEYS` inside `query-client.constants.ts`. Module-specific keys belong in the module's own `constants.ts`.
- **Add shared cache utilities**: Cross-module cache helpers belong in `query-client.utils.ts`.

<br>
--- Last Updated: 2026-03-02 ---
