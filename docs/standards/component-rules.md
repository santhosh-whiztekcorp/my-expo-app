# Component Rules Documentation

## Module Overview

This document defines the architectural standards for creating and organizing components. We follow a strict **Separation of Concerns** (SoC) and a category-based organization to ensure maximum reusability and maintainability.

### Separation of Concerns (SoC)

Every significant component must live in its own directory. Both the **directory and all files within it** must be named in `kebab-case`.

> [!IMPORTANT]
> **Minimalist SoC**: Only create files that are actually used. Do not create empty or unused files (e.g., if a component doesn't need custom types or helpers, omit the `.types.ts` or `.utils.ts`).

- `[component-name]/index.ts`: Standard barrel export.
- `[component-name]/[component-name].tsx`: The visual structure and core component logic.
- `[component-name]/[component-name].types.ts`: Specialized types/interfaces.
- `[component-name]/[component-name].utils.ts`: Internal helper functions or adapters.
- `[component-name]/[component-name].hooks.ts`: Extracted complex logic/custom hooks.
- `[component-name]/[component-name].styles.ts`: Custom React Native styles (StyleSheet).

#### Why SoC?

- **Readability**: Keeps files focused and small, making it easier to scan the UI layout vs logic.
- **Maintainability**: Changes in logic or types don't require hunting through a 500-line JSX file.
- **Testability**: Pure utility functions in `.utils.ts` can be tested independently without mounting the React component.
- **Conflict Resolution**: Reduces git merge conflicts by spreading code across specialized files.

## Maintenance & Extension Guide

### Component Categories

Components are organized into specialized directories based on their role:

1. **`ui/`**: Base visual elements that don't hold business state (e.g., `Avatar`, `Card`, `Badge`, `Button`).
2. **`form/`**: Low-level form inputs. These are "naked" components that handle their own internal display but aren't tied to a form context (e.g., `Input`, `DatePicker`, `Textarea`).
3. **`form-controllers/`**: These are extensions of our `form` components combined with **React Hook Form** controllers. Use these for actual form implementation to ensure consistent error handling and state management.
4. **`custom/`**: Essential abstractions over Native or Library components (e.g., `FlatList`, `ScrollView`, `LinearGradient`, `SafeAreaView`).
   - **Why?**: We wrap these to avoid duplicating logic (like default styles or performance props) and to allow project-wide library swaps (e.g., switching from `expo-linear-gradient` to another provider) at a single point.

### What NOT to Wrap

Avoid creating custom versions of simple primitive components like `View` or `Text`. These are stable, rarely change, and adding layers of abstraction over them adds unnecessary complexity.

> [!IMPORTANT]
> Always check the `custom/` directory before using a Native component directly. If a wrapper exists, use it!

## Technical Deep Dive

### Folder Structure Example

```bash
src/components/ui/button/
├── index.ts
├── button.tsx
├── button.types.ts
├── button.utils.ts
└── button.styles.ts (Optional)
```

### Styling Strategy

We use **NativeWind** (Tailwind CSS) for all styling. Components should receive styling primarily through props that map to Tailwind classes or by utilizing the `className` prop directly.

If a component requires the use of the standard React Native `style` prop (e.g., for complex animations, shadows, or dynamic calculations that Tailwind cannot handle), the styles MUST be defined in the `[component-name].styles.ts` file using `StyleSheet.create`.

<br>
--- Last Updated: 2026-02-25 ---
