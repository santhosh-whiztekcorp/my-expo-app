export type User = {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};
