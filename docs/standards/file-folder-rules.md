# File & Folder Rules Documentation

## Overview

The project follows a **Module-Based Architecture** with a strict **Separation of Concerns** (SoC) approach. Every concern — UI, logic, types, constants — lives in its own dedicated file within a well-defined folder. This keeps the codebase scalable, discoverable, and easy to navigate as the app grows.

## Naming Conventions

| Scope                      | Convention             | Example                                |
| -------------------------- | ---------------------- | -------------------------------------- |
| Folders & files            | `kebab-case`           | `user-profile/`, `api-client.utils.ts` |
| React components & classes | `PascalCase`           | `UserProfile`, `FontProvider`          |
| Types & interfaces         | `PascalCase`           | `UserInfo`, `AppRoute`                 |
| Constants & store exports  | `SCREAMING_SNAKE_CASE` | `STORAGE_KEYS`, `ROUTES`               |
| Screens (Expo Router)      | `kebab-case`           | `src/app/(auth)/login.tsx`             |

## Folder Map

| Folder            | Purpose                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------- |
| `src/app/`        | File-based routes and layouts (Expo Router)                                                 |
| `src/components/` | Shared UI — `primitives/`, `form/`, `form-controllers/`, `custom/`, `common/`, `providers/` |
| `src/config/`     | Global service configurations (API client, Query client)                                    |
| `src/constants/`  | Static data, route paths, font definitions                                                  |
| `src/modules/`    | Domain-specific business features (e.g., `auth`, `user`)                                    |
| `src/services/`   | Core infrastructure services (Secure Storage, etc.)                                         |
| `src/store/`      | Global Zustand state stores                                                                 |
| `src/lib/`        | Lightweight shared utilities                                                                |
| `docs/`           | Technical documentation                                                                     |

## Technical Deep Dive

### Module Structure (`src/modules/`)

Each feature module is a self-contained "mini-app" that mirrors the global `src/` structure:

```bash
src/modules/auth/
├── components/     # Module-specific UI components
├── constants/      # Module-specific constants
├── hooks/          # Module-specific custom hooks
├── schemas/        # Zod validation schemas
├── screens/        # Screen-level components
├── services/       # Module-specific API calls
├── store/          # Module-specific Zustand state
├── types/          # Module-specific TypeScript types
└── index.ts        # Public API — only export what other modules need
```

> [!IMPORTANT]
> `index.ts` is the public API of the module. Other modules should only import from `src/modules/auth` (the barrel), never from deep internal paths like `src/modules/auth/store/auth-store.ts`.

### Expo Router (`src/app/`)

Files inside `src/app/` map directly to navigation routes:

```bash
src/app/
├── index.tsx           # Entry point / redirect
├── _layout.tsx         # Root layout (wraps all routes with Providers)
├── (auth)/
│   ├── _layout.tsx     # Auth group layout
│   ├── login.tsx       # → /(auth)/login
│   └── register.tsx    # → /(auth)/register
└── (main)/
    ├── _layout.tsx     # Main group layout
    └── home.tsx        # → /(main)/home
```

- **Group folders** (`(auth)`, `(main)`) organise routes without affecting the URL structure.
- **`_layout.tsx`** defines the layout (headers, tab bars, etc.) for its group.

### Separation of Concerns (SoC) File Pattern

Every significant component or service lives in its own folder:

```bash
src/components/primitives/button/
├── index.ts              # Barrel export
├── button.tsx            # JSX structure and component logic
├── button.types.ts       # Props and internal types
├── button.utils.ts       # Helper functions (only if needed)
└── button.styles.ts      # StyleSheet styles (only if needed)
```

> [!IMPORTANT]
> **Minimalist SoC**: Only create files you actually need. Don't create empty `.types.ts` or `.utils.ts` files for the sake of structure.

## Maintenance & Extension Guide

- **Add a new screen**: Create the file under the correct `src/app/` group. Add the route path to `ROUTES` in `src/constants/routes.ts`.
- **Add a new module**: Create a folder under `src/modules/` following the structure above. Export the public API from `index.ts`.
- **Add a shared component**: Place it in the appropriate `src/components/` sub-folder (`ui/`, `form/`, `custom/`, etc.). See `component-rules.md` for category guidance.
- **Add a new service**: Create a folder in `src/services/` following the four-file SoC pattern.

<br>
--- Last Updated: 2026-03-02 ---
