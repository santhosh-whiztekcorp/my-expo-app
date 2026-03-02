import {
  camelCase,
  kebabCase,
  capitalize as ldCapitalize,
  truncate as ldTruncate,
  snakeCase,
  startCase,
  toLower,
  toUpper,
  words,
} from 'lodash';

// Converts a string to uppercase using lodash.
export function toUpperCase(str: string): string {
  return toUpper(str);
}

// Converts a string to lowercase using lodash.
export function toLowerCase(str: string): string {
  return toLower(str);
}

// Extracts the initials from a full name.
// Example: "John Doe" -> "JD", ("John Doe", 1) -> "J"
export function getInitial(name: string, count: number = 2): string {
  if (!name) return '';
  const nameWords = words(name);
  return nameWords
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, count);
}

// Capitalizes the first letter of a string.
export function capitalize(str: string): string {
  return ldCapitalize(str);
}

// Converts a string to Title Case (e.g., "hello world" -> "Hello World").
export function toTitleCase(str: string): string {
  return startCase(toLower(str));
}

// Truncates a string to a specific length with an optional omission string.
export function truncate(str: string, length: number = 30, omission: string = '...'): string {
  return ldTruncate(str, { length, omission });
}

// Converts a string to camelCase.
export function toCamelCase(str: string): string {
  return camelCase(str);
}

// Converts a string to kebab-case.
export function toKebabCase(str: string): string {
  return kebabCase(str);
}

// Converts a string to snake_case.
export function toSnakeCase(str: string): string {
  return snakeCase(str);
}
