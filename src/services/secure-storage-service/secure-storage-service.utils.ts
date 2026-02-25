import * as SecureStore from 'expo-secure-store';

import { SECURE_STORE_OPTIONS } from './secure-storage-service.constants';
import { KeyValueStorage } from './secure-storage-service.types';

export const storageAdapter: KeyValueStorage = {
  async set(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value, {
      keychainAccessible: SECURE_STORE_OPTIONS.keychainAccessible,
    });
  },

  async get(key: string): Promise<string | null> {
    return SecureStore.getItemAsync(key);
  },

  async remove(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  },
};
