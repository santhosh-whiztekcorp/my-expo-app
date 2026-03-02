import { z } from 'zod';

import { loginSchema, registerSchema } from '../schemas';

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

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
