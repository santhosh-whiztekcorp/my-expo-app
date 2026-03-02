import { z } from 'zod';

export const nameSchema = z
  .string()
  .trim()
  .min(2, { error: 'Name must be at least 2 characters' })
  .max(100, { error: 'Name is too long' });

export const emailSchema = z.email({ error: 'Invalid email address' }).toLowerCase();

export const passwordSchema = z.string().min(1, { error: 'Password is required' });

export const strictPasswordSchema = z
  .string()
  .min(8, { error: 'Password must be at least 8 characters' })
  .regex(/[A-Z]/, { error: 'Must contain at least one uppercase letter' })
  .regex(/[a-z]/, { error: 'Must contain at least one lowercase letter' })
  .regex(/[0-9]/, { error: 'Must contain at least one number' });
