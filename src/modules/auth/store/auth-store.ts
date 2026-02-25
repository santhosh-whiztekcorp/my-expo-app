import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { secureStorageService } from '@/services/secure-storage-service';

import { AUTH_KEYS } from '../constants';
import { AuthStore } from './auth-store.types';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: async (user, token) => {
        await secureStorageService.setAccessToken(token);
        await secureStorageService.setUserInfo(user);

        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      clearAuth: async () => {
        await secureStorageService.clearAuth();

        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: async (updatedUser) => {
        set((state) => {
          const newUser = state.user ? { ...state.user, ...updatedUser } : null;
          if (newUser) {
            secureStorageService.setUserInfo(newUser);
          }
          return { user: newUser };
        });
      },
    }),
    {
      name: AUTH_KEYS.USER,
      storage: createJSONStorage(() => secureStorageService),
      onRehydrateStorage: () => (state) => {
        if (state?.isAuthenticated && state.token && state.user) {
          secureStorageService.setAccessToken(state.token);
          secureStorageService.setUserInfo(state.user);
        }
      },
    },
  ),
);
