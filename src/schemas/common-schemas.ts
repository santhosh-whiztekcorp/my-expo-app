import { z } from 'zod';

// Email schema using Zod 4 top-level helper
export const emailSchema = z.email({ error: 'Invalid email address' });

// Basic password schema - only requires existence (e.g., for login)
export const passwordSchema = z.string().min(1, { error: 'Password is required' });

// Strict password schema - enforces complexity (e.g., for signup/reset)
export const strictPasswordSchema = z.string().min(6, { error: 'Password must be at least 6 characters' });

// Full name schema
export const fullNameSchema = z.string().min(2, { error: 'Full name is required' });
