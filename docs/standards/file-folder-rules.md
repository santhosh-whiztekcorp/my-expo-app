# File & Folder Rules Documentation

## Module Overview

The project follows a **Module-Based Architecture** combined with a **Separation of Concerns** (SoC) approach. This structure ensures the codebase remains scalable and organized as the application grows.

### Root Directory Breakdown

- `src/`: All source code lives here.
- `docs/`: Technical documentation library.
- `scripts/`: Development and build automation scripts.

## Maintenance & Extension Guide

### Architecture & Naming

Consistency in folder structure and naming is critical for discoverability.

- **Naming Conventions**:
  - **Folders & Files**: ALWAYS `kebab-case` throughout the entire project (e.g., `src/components/ui/button/`, `button.tsx`, `api-client.utils.ts`).
  - **Internal Symbols**: `PascalCase` is used only for internal code exports like React components, types, and classes.
  - **Screens**: `kebab-case` is mandatory for file-based routing in `src/app/`.

- **Modular Organization**:
  - Shared logic and UI reside in their respective global folders (e.g., `src/components`, `src/services`).
  - Business-specific features are organized into the `src/modules/` directory.

### Folder Map

- `src/app/`: Routes and Layouts (using Expo Router).
- `src/components/`: Shared UI elements (UI, Form, Custom wrappers).
- `src/config/`: Global service configurations (API, Query Client).
- `src/constants/`: Static info, route paths, and configuration keys.
- `src/modules/`: Domain-specific business logic (e.g., `auth`, `user`).
- `src/services/`: Core application services (Storage, API handling).
- `src/store/`: Global state management (Zustand).
- `src/types/`: Global TypeScript definitions.

## Technical Deep Dive

### Module-Based Architecture (`src/modules/`)

For complex features, we use a modular approach. Each subfolder within `modules/` acts as a "mini-app" and should mirror the internal structure of the `src/` directory where applicable:

```bash
src/modules/auth/
├── components/   # Module-specific UI
├── services/     # Module-specific business logic
├── store/        # Module-specific state
├── types/        # Module-specific types
└── index.ts      # Public API for the module
```

### The `src/app` Directory

We use **Expo Router** which maps the file system to navigation routes.

- Group folders (e.g., `(auth)`, `(main)`) organize routes without affecting the URL structure.
- `_layout.tsx` files handle layouts for specific groups.

<br>
--- Last Updated: 2026-02-25 ---
