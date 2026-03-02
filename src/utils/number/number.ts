import { clamp as ldClamp } from 'lodash';

// Formats a number as currency (defaults to USD).
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

// Formats a number with standard locale-aware separators (e.g., 1000 -> 1,000).
export function toLocaleNumber(value: number, options?: Intl.NumberFormatOptions, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

// Formats a number in a compact way (e.g., 1200 -> 1.2K).
export function toCompactNumber(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
}

// Clamps a number between a minimum and maximum value.
export function clamp(value: number, min: number, max: number): number {
  return ldClamp(value, min, max);
}

// Generates a random integer between min and max (inclusive).
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
