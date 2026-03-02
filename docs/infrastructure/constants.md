# Constants Documentation

## Overview

Constants are the single source of truth for all static application data — environment configuration, persistence keys, and navigation routes. Using constants prevents magic strings from leaking into business logic and ensures type safety at compile time.

**Location**: `src/constants/`

| File             | Responsibility                                                              |
| ---------------- | --------------------------------------------------------------------------- |
| `env/env.ts`     | API base URL, storage keys, and environment configuration (`ENV_CONSTANTS`) |
| `routes.ts`      | All Expo Router route paths as typed constants                              |
| `fonts/fonts.ts` | All app font definitions (`APP_FONTS`, `FONT_FAMILY`)                       |

## Core Modules

### Env Constants (`env/env.ts`)

Centralises environment-specific values via `ENV_CONSTANTS`. When deploying to different environments (dev, staging, production), only this file needs to change.

### Route Constants (`routes.ts`)

Defines all navigation paths as a typed `const` object. Exports an `AppRoute` union type so components can accept route props that are guaranteed to exist — errors caught at compile time, not runtime.

### Font Constants (`fonts/fonts.ts`)

Defines `APP_FONTS` (used by `FontProvider` for loading) and `FONT_FAMILY` (used in styles for referencing font names). Single source of truth — add a font once here and it's available everywhere.

## Technical Deep Dive

### Route Definitions

```typescript
export const ROUTES = {
  AUTH: {
    LOGIN: '/(auth)/login' as const,
  },
  MAIN: {
    HOME: '/(main)/home' as const,
  },
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES][string];
```

### Usage Pattern

```typescript
import { ROUTES } from '@/constants/routes';

router.replace(ROUTES.AUTH.LOGIN);
```

### Font Usage Pattern

```typescript
import { FONT_FAMILY } from '@/constants/fonts';

// In a StyleSheet or NativeWind className
fontFamily: FONT_FAMILY.montserrat.semibold;
```

## Maintenance & Extension Guide

> [!IMPORTANT]
> Never hardcode route paths in `Link` components or `router` calls. Always reference `ROUTES` to ensure structural changes to the app don't produce broken links.

- **Add a new route**: Add the path to `ROUTES` in `src/constants/routes.ts`. The `AppRoute` type updates automatically.
- **Add a new font**: Add the font file to `assets/fonts/`, add the `require()` entry to `APP_FONTS` in `src/constants/fonts/fonts.ts`, and add the family alias to `FONT_FAMILY`.
- **Change storage keys or env values**: Update `ENV_CONSTANTS` in `src/constants/env/env.ts`. Be mindful that changing a storage key invalidates any data stored under the old key for existing users.
- **Module-specific constants**: Keep module-level constants inside their module (e.g., `src/modules/auth/constants/`). Only promote to global constants if used across multiple modules.

<br>
--- Last Updated: 2026-03-02 ---
