# Services Documentation

## Overview

Services encapsulate complex infrastructure concerns behind a clean, stable API. The primary service is the **Secure Storage Service**, which manages all sensitive data persistence using `expo-secure-store`.

**Location**: `src/services/secure-storage-service/`

| File                                  | Responsibility                                                          |
| ------------------------------------- | ----------------------------------------------------------------------- |
| `secure-storage-service.ts`           | Public service singleton — all getter/setter methods                    |
| `secure-storage-service.constants.ts` | Storage key definitions (`STORAGE_KEYS`)                                |
| `secure-storage-service.types.ts`     | Type definitions (e.g., `UserInfo`)                                     |
| `secure-storage-service.utils.ts`     | `storageAdapter` — wraps `expo-secure-store` behind a generic interface |

## Core Capabilities

- **Auth Token Management**: `setAccessToken`, `getAccessToken`, `setRefreshToken`, `getRefreshToken`, `clearAuth`.
- **User Session**: `setUserInfo`, `getUserInfo` — automatically handles JSON serialisation/deserialisation.
- **Zustand StateStorage**: `getItem`, `setItem`, `removeItem` — satisfies Zustand's `StateStorage` interface, allowing `secureStorageService` to be passed directly to `createJSONStorage()` in any persisted Zustand store.
- **Adapter Pattern**: The underlying storage engine is abstracted behind `storageAdapter` in `secure-storage-service.utils.ts`. Swapping `expo-secure-store` for another provider only requires changing the adapter — the service API stays the same.

## Technical Deep Dive

### The Adapter Pattern

```
secureStorageService
       │
       ▼
  storageAdapter          ← only this changes if the storage engine changes
       │
       ▼
expo-secure-store
```

`secureStorageService` calls `storageAdapter.get/set/remove`. If the storage engine changes (e.g., migrating to `@react-native-async-storage/async-storage`), only `storageAdapter` needs updating — zero changes to the service API or any consumer.

### Zustand Persist Integration

```typescript
import { secureStorageService } from '@/services';
import { createJSONStorage, persist } from 'zustand/middleware';

persist(
  (set) => ({ ... }),
  {
    name: STORAGE_KEY,
    storage: createJSONStorage(() => secureStorageService),
  }
)
```

`secureStorageService.getItem`, `setItem`, and `removeItem` are placed at the top of the service object so they are immediately visible as the Zustand adapter interface.

## Maintenance & Extension Guide

- **Add a new stored value**: Add its key to `STORAGE_KEYS` in `secure-storage-service.constants.ts`, add its type to `secure-storage-service.types.ts`, and implement getter/setter methods in the service file.
- **Swap storage engine**: Update `storageAdapter` in `secure-storage-service.utils.ts` only — the service API is unaffected.
- **Add a new service**: Create a dedicated folder in `src/services/` following the same four-file pattern (`.ts`, `.constants.ts`, `.types.ts`, `.utils.ts`). Only create files that are actually needed.
- **Add a new persisted Zustand store**: Pass `secureStorageService` directly to `createJSONStorage()` — no separate storage wrapper needed.

<br>
--- Last Updated: 2026-03-02 ---
