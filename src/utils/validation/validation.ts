import { EMAIL_REGEX, MIN_PASSWORD_LENGTH, PHONE_REGEX } from './validation.constants';

// Validates if a string is a valid email address.
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

// Validates if a password meets strength requirements.
// Default: At least 8 characters, one letter, and one number.
export function isValidPassword(password: string, minLength: number = MIN_PASSWORD_LENGTH): boolean {
  if (password.length < minLength) return false;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasLetter && hasNumber;
}

// Validates if a string is a valid phone number (basic check).
export function isValidPhone(phone: string): boolean {
  return PHONE_REGEX.test(phone);
}

// Checks if a value is empty (works for strings, arrays, objects).
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}
