# Providers

## Providers

### GestureHandlerRootView

- **Package**: `react-native-gesture-handler`
- **Purpose**: Required root wrapper for gesture recognition (swipes, pans, taps). Must be the outermost provider.
- **Async**: No

---

### QueryClientProvider

- **Package**: `@tanstack/react-query`
- **Purpose**: Makes the shared `queryClient` available to all components for data fetching, caching, and mutation management.
- **Config**: `src/config/query-client/`
- **Async**: No

---

### FontProvider

- **Location**: `src/components/providers/font-provider/`
- **Purpose**: Loads all application fonts using `APP_FONTS` (`src/constants/fonts/`) via `expo-font`. Holds the splash screen open until fonts finish loading or an error occurs.
- **Async**: Yes — returns `null` and keeps splash screen visible until `useFonts` resolves.
- **On error**: Splash screen is dismissed and app renders without custom fonts rather than hanging.

---

### ThemeProvider

- **Location**: `src/components/providers/theme-provider/`
- **Purpose**: Manages the full theme lifecycle — hydration, color scheme sync, and system UI updates.
- **Async**: Yes — waits for the Zustand `persist` store to read the saved theme from `secureStorageService` (SecureStore) on cold start. Returns `null` until hydrated, which is invisible since `FontProvider`'s splash screen still covers the screen.
- **What it does**:
  1. Guards rendering until `useThemeStore.persist.hasHydrated()` is `true`
  2. Syncs `useThemeStore` → NativeWind via `setColorScheme`
  3. Injects a `dark` class on the root `View` to activate dark-mode Tailwind styles
  4. Reactively updates `NavigationBar` button style and `StatusBar` icons on every `colorScheme` change

> [!NOTE]
> Theme changes at runtime are instant and in-place. The `hydrated` guard runs only once on cold start — after that it stays `true` for the entire session.

> [!NOTE]
> Do not add static `NavigationBar` or `StatusBar` calls elsewhere in the app. `ThemeProvider` owns these reactively.

**Store persistence**: `src/store/theme/theme.ts` uses Zustand `persist` with `secureStorageService` as storage (implements `getItem` / `setItem` / `removeItem` matching Zustand's `StateStorage` interface).

---

### SafeAreaProvider

- **Package**: `react-native-safe-area-context`
- **Purpose**: Calculates device insets (notches, home indicator, status bar height) and makes them available via `useSafeAreaInsets`. Must wrap all components that use safe area hooks.
- **Async**: No

---

### StatusBar

- **Package**: `expo-status-bar`
- **Purpose**: Controls the status bar icon colours. Set to `style="auto"` so it automatically reflects the active `colorScheme` — dark mode gets light icons, light mode gets dark icons. No manual management needed.
- **Async**: No

---

### KeyboardProvider

- **Package**: `react-native-keyboard-controller`
- **Purpose**: Enables advanced keyboard interaction — smooth animated resizing, keyboard height tracking, and `KeyboardAvoidingView` enhancements. Must wrap all screens that interact with the keyboard.
- **Async**: No

---

### NotificationProvider

- **Location**: `src/components/providers/notification-provider/`
- **Purpose**: Sets the global `expo-notifications` handler and registers notification listeners.
- **Async**: No

---

### ToastProvider

- **Location**: `src/components/providers/toast-provider/`
- **Purpose**: Mounts the global toast UI so `toast.*` calls can render feedback anywhere in the app.
- **Async**: No

## Technical Deep Dive

### The `Providers` Hierarchy

```tsx
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <FontProvider>
          <ThemeProvider>
            <SafeAreaProvider>
              <StatusBar style="auto" />
              <KeyboardProvider>
                <NotificationProvider>{children}</NotificationProvider>
                <ToastProvider />
              </KeyboardProvider>
            </SafeAreaProvider>
          </ThemeProvider>
        </FontProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
```

### App Start → Page Load Flow

```
App launch
├── GestureHandlerRootView / QueryClientProvider   sync, instant
├── FontProvider      async — loads fonts, holds splash screen visible
├── ThemeProvider     async — waits for SecureStore hydration (~10ms)
│                     returns null until hydrated (behind splash screen)
│                     then applies color scheme + system UI styles
├── SafeAreaProvider / StatusBar / KeyboardProvider   sync, instant
├── NotificationProvider / ToastProvider   sync, instant
└── <Page />          renders with correct theme, no flash
```

### Dependency Flow

- **Gestures outermost**: `GestureHandlerRootView` must wrap everything.
- **Data before all**: `QueryClientProvider` is second so every provider and page can access the query cache.
- **Fonts before theme**: `FontProvider` wraps `ThemeProvider` — the splash screen covers theme hydration delay, preventing any flash of wrong theme.
- **Style before layout**: `ThemeProvider` wraps `SafeAreaProvider` so layout providers render only after the correct color scheme is applied.
- **Keyboard innermost**: `KeyboardProvider` is closest to the page content so keyboard events propagate correctly.

## Maintenance & Extension Guide

- **Adding a Provider**: Update `src/components/providers/index.tsx`.
- **Provider order matters** — see the Dependency Flow section before inserting a new provider.

> [!CAUTION]
> Changing the hierarchy (e.g., moving `QueryClientProvider` inside `ThemeProvider`) can break components that depend on specific contexts being available at initialization.

<br>
--- Last Updated: 2026-03-02 ---
