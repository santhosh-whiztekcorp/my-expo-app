# Component Rules

## Component Categories

Components are organised into specialised directories based on their role:

| Category            | Location                           | Purpose                                                                                                                        |
| ------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `primitives/`       | `src/components/primitives/`       | Base visual elements with no business logic (e.g., `Button`, `Avatar`, `Badge`, `Card`)                                        |
| `form/`             | `src/components/form/`             | Low-level form inputs — manage internal display only, not tied to a form library (e.g., `Input`, `DatePicker`)                 |
| `form-controllers/` | `src/components/form-controllers/` | Form inputs wired to **React Hook Form** — use these for actual form screens                                                   |
| `custom/`           | `src/components/custom/`           | App-level direct wrappers over native or library components (e.g., `CustomFlatlist`, `CustomScrollView`, `CustomSafeAreaView`) |
| `common/`           | `src/components/common/`           | Feature-rich, composite, or specialised components (e.g., `InfiniteList`, `SafePaddingView`)                                   |
| `providers/`        | `src/components/providers/`        | React context providers that wrap the entire app or sections of it                                                             |

> [!IMPORTANT]
> Always check `custom/` before using a native component directly. If a wrapper exists, use it to keep default styles and performance props consistent project-wide.

## Technical Deep Dive

### Separation of Concerns (SoC) File Pattern

Every significant component lives in its own folder. Both the folder and all files within it use `kebab-case`:

```bash
src/components/primitives/button/
├── index.ts              # Barrel export (re-exports the component)
├── button.tsx            # JSX structure and core logic
├── button.types.ts       # Props and internal type definitions
├── button.utils.ts       # Helper functions (only if needed)
├── button.hooks.ts       # Hooks (only if needed)
└── button.styles.ts      # StyleSheet styles (only if needed)
```

> [!IMPORTANT]
> **Minimalist SoC**: Only create files that are actually needed. Do not create empty `.types.ts`, `.utils.ts`, or `.styles.ts` files just for the sake of structure.

#### Why SoC?

- **Readability**: Files are focused — JSX layout never mixed with business logic or type definitions.
- **Maintainability**: Changing logic or types doesn't require navigating a 500-line JSX file.
- **Testability**: Pure utility functions in `.utils.ts` can be unit tested without mounting a React component.
- **Conflict Resolution**: Smaller, focused files significantly reduce git merge conflicts.

### Styling Strategy

We use **NativeWind** (Tailwind CSS) for all styling.

- Pass styles via `className` or Tailwind-mapped props.
- If a component needs styles that Tailwind can't express (e.g., complex animations, shadows, dynamic calculations), define them in `[component-name].styles.ts` using `StyleSheet.create`.

### What NOT to Wrap

Avoid creating custom versions of simple primitive components like `View` or `Text`. These are stable, don't change across library updates, and wrapping them adds unnecessary abstraction.

## Maintenance & Extension Guide

- **Add a `primitives/` component**: Create a folder in `src/components/primitives/` following the SoC pattern. Export from `src/components/primitives/index.ts`.
- **Add a `form/` input**: Create in `src/components/form/`. Expose a controlled `value` / `onChange` interface. Do NOT couple it to React Hook Form.
- **Add a `form-controller/`**: Wrap an existing `form/` component with `useController` from React Hook Form. Re-use display logic from the base form component.
- **Add a `custom/` wrapper**: Wrap native/library components that need shared default behaviour (default props, performance flags, unified styling). These are typically 1:1 wrappers.
- **Add a `common/` component**: Create feature-rich or composite components that aren't direct wrappers (e.g., `InfiniteList` which adds loading/empty states to a list).

<br>
--- Last Updated: 2026-03-02 ---
