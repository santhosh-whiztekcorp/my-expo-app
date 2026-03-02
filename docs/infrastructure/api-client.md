# API Client

## Location

`src/config/api-client/`

| File                      | Responsibility                                      |
| ------------------------- | --------------------------------------------------- |
| `api-client.ts`           | Core Axios instance and interceptor setup           |
| `api-client.constants.ts` | Base URL, timeout, log toggles                      |
| `api-client.utils.ts`     | Token access, refresh logic, logout handler         |
| `api-client.types.ts`     | Extended Axios types (e.g., `_retry`, `_startTime`) |

## Core Capabilities

- **Bearer Authentication**: Automatically injects access tokens into every request.
- **Resilient Token Refresh**: Singleton pattern prevents duplicate refresh requests when multiple concurrent calls expire at the same time — queued requests resolve with the new token.
- **Activity Logging**: Captures request method, URL, status, and duration on every interaction for easy debugging.

## Technical Deep Dive

### Client Initialization

```typescript
export const apiClient = axios.create({
  baseURL: API_CLIENT_CONSTANTS.BASE_URL,
  timeout: API_CLIENT_CONSTANTS.TIMEOUT,
});
```

### Request Interceptor

- **Token Injection**: Calls `getAccessToken()` from `api-client.utils.ts` and attaches it as a `Bearer` header.
- **Timing**: Stamps `config._startTime = Date.now()` to measure precise request duration in the response interceptor.

### Response Interceptor

- **Success**: Calls `logInteraction` and returns `response.data` directly.
- **401 / Token Expiry**:
  1. If a refresh is already in progress → queues the request, resolves it once the new token is available.
  2. Otherwise → calls `refreshTokenRequest`, stores the new tokens, retries the original request.
  3. If the refresh token is also expired → calls `handleLogout`.
- **Logging**: Ignores URLs in `LOG_IGNORED_URLS` (e.g., the refresh endpoint) to avoid noise.

### Logout Flow

`handleLogout` clears all stored auth data via `secureStorageService` and calls `router.replace` to reset the navigation stack to the login screen without leaving a back history entry.

### Critical Gotchas

> [!CAUTION]
> Do NOT import `apiClient` inside `api-client.utils.ts`. The refresh and logout requests must use a raw `axios` instance to avoid circular dependency issues.

> [!CAUTION]
> The `_retry` flag on the request config ensures each request is only retried once. Without it, a failed refresh would cause an infinite retry loop.

## Maintenance & Extension Guide

The core interceptor logic in `api-client.ts` is stable and should rarely be touched. Follow the **Utility-First** strategy:

- **Change API environment**: Update `BASE_URL` in `api-client.constants.ts`.
- **Toggle logging**: Set `ENABLE_LOGS` in `api-client.constants.ts`.
- **Filter sensitive routes from logs**: Add partial URL paths to `LOG_IGNORED_URLS` in `api-client.constants.ts`.
- **Swap storage or auth logic**: Update `api-client.utils.ts` — the interceptor chain stays untouched.

<br>
--- Last Updated: 2026-03-02 ---
