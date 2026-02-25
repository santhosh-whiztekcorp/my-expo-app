# Services Documentation

## Module Overview

Services encapsulate complex business logic and infrastructure details, providing a clean API to the rest of the application. The primary service is the **Secure Storage Service**, which manages the persistence of sensitive data.

### Key Capabilities

- **Encapsulated Logic**: Hides the complexity of third-party libraries behind simple interfaces.
- **Interchangeable Foundations**: Built using the Adapter Pattern, allowing underlying storage engines to be swapped without changing the service's public API.

## Maintenance & Extension Guide

We follow a layered architecture to ensure that infrastructure changes don't leak into the business logic.

### How to make changes:

- **Adding a New Service**: Create a dedicated folder in `src/services/` (e.g., `src/services/auth-service`). Follow the standard file pattern: Implementation (`.ts`), Types (`.types.ts`), Constants (`.constants.ts`), and Utilities (`.utils.ts`).
- **Swapping Storage Engines**: If migrating away from `expo-secure-store`, only the `storageAdapter` in `src/services/secure-storage-service/secure-storage-service.utils.ts` needs to be updated.
- **Updating Keys**: Add new persistent keys to the service-specific `constants.ts` and implement matching getter/setter methods.

> [!TIP]
> By keeping the implementation details inside utilities and adapters, the main service file remains a clean manifest of available capabilities.

## Technical Deep Dive

### The Adapter Pattern

The `secureStorageService` wraps the storage engine, ensuring the app isn't tightly coupled to any specific persistence library.

### Storage Service API

- **Auth Tokens**: `setAccessToken`, `setRefreshToken`, `clearAuth`.
- **User Session**: `setUserInfo`, `getUserInfo` (automatically handles JSON serialization).

### Standard File Pattern

Each service follows this strict structure:

1.  **constants.ts**: Internal keys and configuration.
2.  **types.ts**: Interface definitions for the service.
3.  **utils.ts**: Underlying library abstractions and adapters.
4.  **main service file**: The exported singleton that orchestrates the above.

<br>
--- Last Updated: 2026-02-25 ---
