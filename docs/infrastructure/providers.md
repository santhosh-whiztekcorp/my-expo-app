# Providers Documentation

## Module Overview

Global providers manage cross-cutting concerns like data fetching, state management, and theming. They are orchestrated by the `RootProvider` to ensure a consistent environment and correct dependency hierarchy across the entire application.

### Key Providers

- **GestureHandlerRootView**: Required for advanced touch interactions and animations.
- **QueryClientProvider**: Manages TanStack Query's cache and data lifecycle.
- **ThemeProvider**: Synchronizes the global theme store with NativeWind and manages the `dark` class injection.
- **SafeAreaProvider**: Calculates system insets (notches, status bars) for precise layout.
- **KeyboardProvider**: Manages advanced keyboard resizing and interaction logic.

## Maintenance & Extension Guide

The order of providers in `RootProvider` is critical. When adding a new provider, consider where it sits in the dependency chain.

- **Adding a Provider**: Update `src/components/providers/root-provider.tsx`.
- **System UI Management**: The `RootProvider` handles `StatusBar` and `NavigationBar` styles globally to ensure they match the application's aesthetic.

> [!CAUTION]
> Changing the hierarchy of providers (e.g., moving `QueryClientProvider` inside `ThemeProvider`) can break components that depend on specific contexts for initialization.

### Theme Synchronization

The `ThemeProvider` (`src/components/providers/theme-provider/`) does not just wrap children; it actively syncs the **Zustand Theme Store** with **NativeWind**.

1.  Listens for changes in `useThemeStore`.
2.  Calls `setColorScheme` from NativeWind to update utility classes.
3.  Injects a `dark` class to a root `View` to trigger dark-mode styles globally.

## Technical Deep Dive

### The `RootProvider` Hierarchy

Located in `src/components/providers/root-provider.tsx`, the current nesting order is optimized for dependency accessibility:

```tsx
export function RootProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Standardizes navigation bar style on launch
    NavigationBar.setButtonStyleAsync('dark');
    NavigationBar.setBackgroundColorAsync('transparent');
  }, []);

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SafeAreaProvider>
            <StatusBar style="auto" />
            <KeyboardProvider>{children}</KeyboardProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
```

### Dependency Flow

- **Data First**: `QueryClientProvider` is high up so that theme-based data (if any) can be fetched.
- **Style Next**: `ThemeProvider` ensures that layout providers (`SafeAreaProvider`) have access to any theme-driven spacing or constraint constants.

<br>
--- Last Updated: 2026-02-25 ---
