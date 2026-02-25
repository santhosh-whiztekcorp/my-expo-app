import { User } from '../types';

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
};

export type AuthActions = {
  setAuth: (user: User, token: string) => Promise<void>;
  clearAuth: () => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
};

export type AuthStore = AuthState & AuthActions;
