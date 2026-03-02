// Safely parses a JSON string.
export function safeParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return fallback;
  }
}

// Safely stringifies a value to JSON.
export function safeStringify(value: unknown, fallback: string = ''): string {
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.error('Error stringifying value:', error);
    return fallback;
  }
}

// Checks if a string is a valid JSON.
export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
