# Constants Documentation

## Module Overview

This system is the single source of truth for all static application data, environment-specific configurations, and navigation routes. It ensures type safety and prevents "magic strings" from proliferating through the codebase.

### Core Modules

- **App Constants**: Manages environment variables (API URLs) and persistence keys.
- **Route Constants**: Enumerates all file-based routes for Expo Router.

## Maintenance & Extension Guide

To keep the application consistent, always update these constants before using new strings in your code.

### How to make changes:

- **Adding New Features/Pages**: Define the new route path in `src/constants/routes.ts`. This instantly enables type-safe navigation via the `ROUTES` constant.
- **Modifying Key-Value Pairs**: Update `src/constants/app.ts` for changes in storage keys or environment URLs.
- **Updating Module-Specific Constants**: For API or Query specific toggles, use their respective `constants.ts` files in `src/config/`.

> [!IMPORTANT]
> Never hardcode paths in `Link` components or `router` calls. Always reference `ROUTES` to ensure that structural changes to the app don't lead to broken links.

## Technical Deep Dive

### Route Definitions

Routes are defined as const objects to allow for strict TypeScript inference:

```typescript
export const ROUTES = {
  AUTH: {
    LOGIN: '/(auth)/login' as const,
  },
  MAIN: {
    HOME: '/(main)/home' as const,
  },
} as const;
```

### Usage Pattern

The patterns used project-wide ensure that navigation remains robust:

```typescript
import { ROUTES } from '@/constants/routes';

// Navigation example
router.replace(ROUTES.AUTH.LOGIN);
```

### Type Safety

The system exports an `AppRoute` union type. This allows components to accept route props that are guaranteed to exist, catching errors at compile-time rather than runtime.

<br>
--- Last Updated: 2026-02-25 ---
