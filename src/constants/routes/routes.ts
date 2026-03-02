export const ROUTES = {
  AUTH: {
    LOGIN: '/(auth)/login' as const,
    REGISTER: '/(auth)/register' as const,
  },
  MAIN: {
    HOME: '/(main)/home' as const,
  },
} as const;
