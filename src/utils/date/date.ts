import {
  add,
  format,
  formatDistanceToNow,
  isToday as ldIsToday,
  isTomorrow as ldIsTomorrow,
  isYesterday as ldIsYesterday,
  parseISO,
  type Duration,
} from 'date-fns';

// Formats a date using date-fns.
export function formatDate(date: Date | string | number, formatStr: string = 'PP'): string {
  const dateObj = date instanceof Date ? date : typeof date === 'string' ? parseISO(date) : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  return format(dateObj, formatStr);
}

// Returns a human-readable relative time (e.g., "just now", "5 minutes ago", "2 days ago").
export function timeAgo(date: Date | string | number): string {
  const dateObj = date instanceof Date ? date : typeof date === 'string' ? parseISO(date) : new Date(date);
  if (isNaN(dateObj.getTime())) return 'Invalid Date';

  const diffInSeconds = Math.floor((new Date().getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  return formatDistanceToNow(dateObj, { addSuffix: true });
}

// Check if a date is today.
export function isToday(date: Date | string | number): boolean {
  const dateObj = date instanceof Date ? date : typeof date === 'string' ? parseISO(date) : new Date(date);
  return ldIsToday(dateObj);
}

// Check if a date is tomorrow.
export function isTomorrow(date: Date | string | number): boolean {
  const dateObj = date instanceof Date ? date : typeof date === 'string' ? parseISO(date) : new Date(date);
  return ldIsTomorrow(dateObj);
}

// Check if a date is yesterday.
export function isYesterday(date: Date | string | number): boolean {
  const dateObj = date instanceof Date ? date : typeof date === 'string' ? parseISO(date) : new Date(date);
  return ldIsYesterday(dateObj);
}

// Add time to a date (e.g., add days, months, etc.).
export function addTime(date: Date | string | number, duration: Duration): Date {
  const dateObj = date instanceof Date ? date : typeof date === 'string' ? parseISO(date) : new Date(date);
  return add(dateObj, duration);
}
