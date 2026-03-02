export const AUTH_KEYS = {
  USER: 'auth:user',
  TOKEN: 'auth:token',
} as const;

export const AUTH_QUERY_KEYS = {
  ME: 'auth:me',
} as const;

export const AUTH_API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  REFRESH: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
} as const;
