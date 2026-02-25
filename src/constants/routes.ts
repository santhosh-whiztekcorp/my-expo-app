export const ROUTES = {
  AUTH: {
    LOGIN: '/(auth)/login' as const,
    REGISTER: '/(auth)/register' as const,
  },
  MAIN: {
    HOME: '/(main)/home' as const,
  },
} as const;

export type AppRoute = (typeof ROUTES.AUTH)[keyof typeof ROUTES.AUTH] | (typeof ROUTES.MAIN)[keyof typeof ROUTES.MAIN];
