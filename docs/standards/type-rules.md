# Type Rules

## Core Rules

| Rule                    | Detail                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| No `any`                | Use `unknown` and perform type narrowing. Enforced by ESLint — violations fail the build.                                |
| `type` over `interface` | Use `type` for all definitions. More versatile (supports unions/intersections), prevents accidental declaration merging. |
| Naming                  | `PascalCase` for all type names. No `T` or `I` prefixes — use `User`, not `TUser` or `IUser`.                            |
| Zod for external data   | Validate all API responses and form inputs with Zod schemas. Infer the TypeScript type from the schema.                  |
| Route types             | Use `AppRoute` from `src/constants/routes.ts` for all navigation — never pass raw strings to `router` calls.             |

> [!IMPORTANT]
> The ESLint rule `@typescript-eslint/no-explicit-any: "error"` is active. All `any` violations will fail `npm run check`.

## Technical Deep Dive

### Zod Schema Validation

For all external data (API responses, form inputs), define a Zod schema first and infer the type from it — single source of truth, runtime-safe:

```typescript
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type User = z.infer<typeof UserSchema>;
```

### Handling Unknown Data

When receiving data of an uncertain shape, use `unknown` with type narrowing rather than casting:

```typescript
const handleData = (data: unknown) => {
  if (typeof data === 'string') {
    // data is narrowed to string here
  }
};
```

### Where Types Live

| Type                          | Location                                     |
| ----------------------------- | -------------------------------------------- |
| API request/response shapes   | `src/config/api-client/api-client.types.ts`  |
| Route union type (`AppRoute`) | `src/constants/routes.ts`                    |
| Store state and actions       | Each store's own `.types.ts` file            |
| Module-specific types         | `src/modules/[module]/types/`                |
| Component props               | `[component-name]/[component-name].types.ts` |

### `type` vs `interface` — Why We Use `type`

- Supports union types: `type Status = 'active' | 'inactive'`
- Supports intersection types: `type AdminUser = User & AdminPermissions`
- No accidental declaration merging (a risk with `interface`)
- Single consistent keyword for all type definitions across the codebase

## Maintenance & Extension Guide

- **Adding a new type**: Place it in the closest `.types.ts` file to where it's used. Promote to a shared location only if used across multiple modules.
- **Validating a new API endpoint**: Always define a Zod schema first, then infer the type. Do not write types manually for API data.
- **Adding a new route**: Add the path to `ROUTES` in `src/constants/routes.ts` — the `AppRoute` type updates automatically.

<br>
--- Last Updated: 2026-03-02 ---
