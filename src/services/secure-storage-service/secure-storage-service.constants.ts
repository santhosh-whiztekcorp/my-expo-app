import * as SecureStore from 'expo-secure-store';

import { ENV_CONSTANTS } from '@/constants/env';

export const STORAGE_KEYS = {
  ACCESS_TOKEN_KEY: ENV_CONSTANTS.env.ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY: ENV_CONSTANTS.env.REFRESH_TOKEN_KEY,
  USER_INFO_KEY: ENV_CONSTANTS.env.USER_INFO_KEY,
} as const;

export const SECURE_STORE_OPTIONS = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED,
} as const;
