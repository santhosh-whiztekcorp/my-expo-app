export const ENV_CONSTANTS = {
  env: {
    API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
    ACCESS_TOKEN_KEY: process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY ?? 'auth.accessToken',
    REFRESH_TOKEN_KEY: process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY ?? 'auth.refreshToken',
    USER_INFO_KEY: process.env.EXPO_PUBLIC_USER_INFO_KEY ?? 'auth.userInfo',
  },
} as const;
