import { STORAGE_KEYS } from './secure-storage-service.constants';
import { UserInfo } from './secure-storage-service.types';
import { storageAdapter } from './secure-storage-service.utils';

export const secureStorageService = {
  async setAccessToken(token: string) {
    await storageAdapter.set(STORAGE_KEYS.ACCESS_TOKEN_KEY, token);
  },

  async getAccessToken() {
    return storageAdapter.get(STORAGE_KEYS.ACCESS_TOKEN_KEY);
  },

  async setRefreshToken(token: string) {
    await storageAdapter.set(STORAGE_KEYS.REFRESH_TOKEN_KEY, token);
  },

  async getRefreshToken() {
    return storageAdapter.get(STORAGE_KEYS.REFRESH_TOKEN_KEY);
  },

  async setUserInfo(userInfo: UserInfo) {
    await storageAdapter.set(STORAGE_KEYS.USER_INFO_KEY, JSON.stringify(userInfo));
  },

  async getUserInfo(): Promise<UserInfo | null> {
    const data = await storageAdapter.get(STORAGE_KEYS.USER_INFO_KEY);
    return data ? JSON.parse(data) : null;
  },

  async clearAuth() {
    await Promise.all([
      storageAdapter.remove(STORAGE_KEYS.ACCESS_TOKEN_KEY),
      storageAdapter.remove(STORAGE_KEYS.REFRESH_TOKEN_KEY),
      storageAdapter.remove(STORAGE_KEYS.USER_INFO_KEY),
    ]);
  },

  // StateStorage compatible methods for Zustand persist
  getItem: (name: string) => storageAdapter.get(name),
  setItem: (name: string, value: string) => storageAdapter.set(name, value),
  removeItem: (name: string) => storageAdapter.remove(name),
};
