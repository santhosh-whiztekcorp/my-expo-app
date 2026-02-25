# Type Rules Documentation

## Module Overview

This project enforces strict TypeScript typing to catch errors early and ensure a highly predictable codebase. We prioritize clarity, safety, and modern TypeScript patterns over loose or implicit types.

### Key Capabilities

- **Strict Linting**: Disallows the `any` type project-wide.
- **Type-Safe Navigation**: Uses route constants to ensure links never break.
- **Schema Validation**: Uses **Zod** for runtime data validation (API responses, form inputs).

## Maintenance & Extension Guide

To maintain high type safety, adhere to these standards:

- **No `any`**: Never use the `any` keyword. If a type is unknown, use `unknown` and perform type narrowing.
- **Types over Interfaces**: We strictly use `type` for all definitions (objects, props, state) because it is more versatile (supports unions/intersections), prevents accidental declaration merging (side effects), and ensures a single consistent keyword for all logic and data structures.
- **Naming**: Use `PascalCase` for all type names. Do not use "T" or "I" prefixes (e.g., use `User`, not `TUser` or `IUser`).

> [!IMPORTANT]
> The ESLint rule `@typescript-eslint/no-explicit-any: "error"` is active. All violations will fail the build.

## Technical Deep Dive

### Data Validation (Zod)

For robust runtime safety, validate all external data using Zod schemas and infer the type directly to ensure a single source of truth:

```typescript
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type User = z.infer<typeof UserSchema>;
```

### Handling Unknown Data

When dealing with external data, use `unknown` combined with type guards or casting after validation.

```typescript
const handleData = (data: unknown) => {
  if (typeof data === 'string') {
    // data is narrowed to string
  }
};
```

### Domain-Specific Types

- **API Types**: Defined in `src/config/api-client/api-client.types.ts`.
- **Route Types**: The `AppRoute` union type in `src/constants/routes.ts` facilitates type-safe navigation.
- **Store Types**: Each Zustand store defines its own state and action types.

<br>
--- Last Updated: 2026-02-25 ---
