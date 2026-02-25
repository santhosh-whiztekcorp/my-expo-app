import { User } from '@/modules/auth';

export type KeyValueStorage = {
  set(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
  remove(key: string): Promise<void>;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserInfo = User;
