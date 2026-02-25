# API Client Documentation

## Module Overview

The API client is a centralized module built on **Axios** that orchestrates all network communication. It is designed to be resilient, handle authentication seamlessly, and provide transparent logging for debugging.

### Core Capabilities

- **Bearer Authentication**: Automatically manages and injects access tokens.
- **Resilient Token Refresh**: Implements a singleton pattern to handle expired tokens gracefully across concurrent requests.
- **Activity Logging**: Captures detailed request/response metrics to simplify troubleshooting.

## Maintenance & Extension Guide

To ensure the stability of the application's networking layer, we follow a **Utility-First Maintenance Strategy**. The core coordination logic in `api-client.ts` is stable and should rarely be touched.

### How to make changes:

- **Changing API Environments**: Update `BASE_URL` in `src/config/api-client/api-client.constants.ts`.
- **Enabling/Disabling Logs**: Toggle `ENABLE_LOGS` in `api-client.constants.ts`.
- **Filtering Sensitive Routes**: Add partial URL paths to `LOG_IGNORED_URLS` in `api-client.constants.ts`.
- **Updating Logic (Storage/Auth)**: If the underlying storage or auth logic changes (e.g., swapping `SecureStore`), update the implementation in `src/config/api-client/api-client.utils.ts`.

> [!TIP]
> By modifying utilities instead of the core client, you avoid risky changes to the interceptor chain and the complex asynchronous "Singleton Refresh" logic.

## Technical Deep Dive

### Client Initialization

The client uses a configured Axios instance in `api-client.ts`:

```typescript
export const apiClient = axios.create({
  baseURL: API_CLIENT_CONSTANTS.BASE_URL,
  timeout: API_CLIENT_CONSTANTS.TIMEOUT,
});
```

### Request Interceptor

- **Token Injection**: Calls `getAccessToken()` from utilities.
- **Execution Timing**: Attaches a `_startTime` to the config to calculate precise request duration in the response interceptor.

### Response Interceptor (The "Brain")

- **Success Handler**: Executes `logInteraction` and returns data directly.
- **Error Handler (401 Handling)**:
  - Detects expired tokens.
  - If a refresh is already in progress, it queues the request to resolve once the new token is available.
  - Otherwise, it triggers `refreshTokenRequest`, updates the store, and retries the original request.
  - If the refresh token is also expired, it triggers `handleLogout`.

### Logging & Logout Flow

- **Filtering**: The logging utility automatically ignores URLs defined in the constants (like the refresh endpoint).
- **Redirection**: `handleLogout` performs a side-effect-free cleanup and uses `router.replace` to reset the user's navigation context.

### Critical Gotchas

- **Circular Dependencies**: Do NOT import `apiClient` into `api-client.utils.ts`. Use a raw `axios` instance for refresh and logout requests.
- **Retry Protection**: The `_retry` flag ensures that a request is only ever retried once, preventing infinite loops if a refresh fails.

<br>
--- Last Updated: 2026-02-25 ---
