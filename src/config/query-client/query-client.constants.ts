export const QUERY_CLIENT_CONSTANTS = {
  STALE_TIME: 1000 * 60 * 5, // 5 minutes
  GC_TIME: 1000 * 60 * 60 * 24, // 24 hours
  RETRY_COUNT: 2,

  // Add keys that should never retry
  NO_RETRY_QUERY_KEYS: ['auth-check'],

  // Query keys
  QUERY_KEYS: {
    AUTH: 'auth',
    USER: 'user',
  },
} as const;
