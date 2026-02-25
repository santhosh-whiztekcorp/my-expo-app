# Quality Standards Documentation

## Module Overview

This project leverages automated tooling to maintain a high-quality codebase, ensuring consistency, readability, and type safety across all files.

### Automated Checks

We use a suite of tools to enforce standards. These are integrated into the development workflow and confirmed via the `npm run check` command.

- **ESLint**: Enforces project-specific coding standards and catches common errors. No `any` types are allowed.
- **TypeScript**: Performs strict type checking to ensure compile-time safety.
- **Prettier**: Handles consistent code formatting (tabs, quotes, semicolons).

## Maintenance & Extension Guide

### Automated Sorting & Ordering

To reduce diff noise and improve scanability, we use specialized Prettier plugins:

1. **Import Sorting**: All imports are automatically sorted into logical groups (Core, Local, External).
   - _Tip_: Simply save your file, and the imports will reorder.
2. **Tailwind Class Sorting**: We use the `prettier-plugin-tailwindcss` to ensure that Tailwind classes follow the recommended official order.
   - _Why?_: This makes it easy to find specific styles (e.g., layout first, then colors) across different components.

### Quality Workflow

Before pushing code, run the master check script:

```bash
npm run check
```

This runs:

1. `lint:fix`: Catches and fixes auto-fixable lint errors.
2. `typeCheck`: Ensures no TypeScript errors exist.
3. `format`: Runs Prettier to sort imports and Tailwind classes.

<br>
--- Last Updated: 2026-02-25 ---
