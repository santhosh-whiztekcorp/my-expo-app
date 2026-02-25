import * as SecureStore from 'expo-secure-store';

import { APP_CONSTANTS } from '@/constants/app';

export const STORAGE_KEYS = {
  ACCESS_TOKEN_KEY: APP_CONSTANTS.env.ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY: APP_CONSTANTS.env.REFRESH_TOKEN_KEY,
  USER_INFO_KEY: APP_CONSTANTS.env.USER_INFO_KEY,
} as const;

export const SECURE_STORE_OPTIONS = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED,
} as const;
