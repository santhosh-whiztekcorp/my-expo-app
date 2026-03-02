import { z } from 'zod';

import { type AuthResponse, type User } from '@/types';

import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from '../schemas';

export type { User, AuthResponse };

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
