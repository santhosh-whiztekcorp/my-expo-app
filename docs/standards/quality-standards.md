# Quality Standards Documentation

## Overview

This project uses automated tooling to maintain a consistently high-quality codebase. All checks are unified into a single command that enforces formatting, linting, and type safety before any code is committed.

## Automated Checks

| Tool           | Purpose                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------ |
| **Prettier**   | Consistent code formatting — quotes, semicolons, print width, import order, Tailwind class order |
| **ESLint**     | Coding standards and error prevention — no `any`, unused vars, React rules                       |
| **TypeScript** | Strict compile-time type checking                                                                |

Run all checks at once:

```bash
npm run check
```

This runs in order:

1. `format` — Prettier formats all files and sorts imports + Tailwind classes.
2. `lint:fix` — ESLint catches and auto-fixes any remaining issues.
3. `typeCheck` — TypeScript confirms no type errors exist.

> [!TIP]
> Run `npm run check` before every push. The order matters — formatting runs first so lint rules evaluate already-formatted code.

## Coding Conventions

### Function Declarations vs Arrow Functions

All named, exportable functions must use **`function` declarations** — not arrow functions assigned to `const`.

```typescript
// ✅ Correct
export function useLogin() { ... }
export async function handleLogout() { ... }
export default function HomeScreen() { ... }

// ❌ Incorrect
export const useLogin = () => { ... }
export const handleLogout = async () => { ... }
```

**Exceptions — `const` is correct for:**

| Case                          | Example                                  |
| ----------------------------- | ---------------------------------------- |
| Zustand stores                | `export const useThemeStore = create(…)` |
| Constants & config objects    | `export const ROUTES = { … }`            |
| `forwardRef` / `cva` wrappers | `export const Button = forwardRef(…)`    |
| Inline callbacks              | `useEffect(() => { … }, [])`             |

The rule applies to named exported functions — components, hooks, utilities, and async helpers. Inline callbacks inside hooks or `.map()` / `.filter()` calls remain as arrow functions.

## Technical Deep Dive

### Import Sorting (`@ianvs/prettier-plugin-sort-imports`)

Imports are automatically sorted into groups on save:

```
1. react / react-native / expo core
2. Third-party libraries
3. Internal aliases (@/...)
4. Relative imports (./)
```

Just write your imports — Prettier reorders them on save.

### Tailwind Class Sorting (`prettier-plugin-tailwindcss`)

Tailwind classes are sorted into the official recommended order (layout → spacing → typography → colors → effects). This makes it easy to find specific styles when scanning components.

### ESLint Configuration

Configured in `eslint.config.js`. Key enforced rules:

- `@typescript-eslint/no-explicit-any: "error"` — no `any` types allowed.
- React and React Native specific rules for hooks and best practices.

### Prettier Configuration

Configured in `.prettierrc`. Key settings:

| Setting         | Value  |
| --------------- | ------ |
| `singleQuote`   | `true` |
| `semi`          | `true` |
| `printWidth`    | `130`  |
| `tabWidth`      | `2`    |
| `trailingComma` | `all`  |

## Maintenance & Extension Guide

- **Add a new lint rule**: Update `eslint.config.js`. Document the reason in a comment next to the rule.
- **Change formatting defaults**: Update `.prettierrc`. Run `npm run format` after to apply the new style across all files.
- **Exclude files from formatting**: Add patterns to `.prettierignore`.
- **Add a new file type to formatting**: Add the extension to the glob in the `format` script in `package.json`.

<br>
--- Last Updated: 2026-03-02 ---
