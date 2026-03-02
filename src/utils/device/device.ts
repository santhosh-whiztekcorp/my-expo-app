import { PixelRatio, Platform } from 'react-native';
import * as Device from 'expo-device';

import { BREAKPOINTS, GUIDELINE_BASE_HEIGHT, GUIDELINE_BASE_WIDTH, WINDOW_HEIGHT, WINDOW_WIDTH } from './device.constants';

export function isPhysicalDevice(): boolean {
  return Device.isDevice;
}

// Platform Detection
export function isIOS(): boolean {
  return Platform.OS === 'ios';
}

export function isAndroid(): boolean {
  return Platform.OS === 'android';
}

export function isWeb(): boolean {
  return Platform.OS === 'web';
}

export function getPlatform(): string {
  return Platform.OS;
}

// Device Type Detection
export function isMobile(): boolean {
  return WINDOW_WIDTH < BREAKPOINTS.MOBILE;
}

export function isTablet(): boolean {
  return WINDOW_WIDTH >= BREAKPOINTS.MOBILE && WINDOW_WIDTH < BREAKPOINTS.TABLET;
}

export function isLaptop(): boolean {
  return WINDOW_WIDTH >= BREAKPOINTS.TABLET && WINDOW_WIDTH < BREAKPOINTS.LAPTOP;
}

export function isDesktop(): boolean {
  return WINDOW_WIDTH >= BREAKPOINTS.LAPTOP;
}

export function getScreenType(): 'mobile' | 'tablet' | 'laptop' | 'desktop' {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  if (isLaptop()) return 'laptop';
  return 'desktop';
}

// Scaling helpers for responsive UI
export const scale = (size: number) => (WINDOW_WIDTH / GUIDELINE_BASE_WIDTH) * size;
export const verticalScale = (size: number) => (WINDOW_HEIGHT / GUIDELINE_BASE_HEIGHT) * size;
export const moderateScale = (size: number, factor: number = 0.5) => size + (scale(size) - size) * factor;

// Responsive Font Scaling
export function normalizeFont(size: number): number {
  const newSize = size * (WINDOW_WIDTH / GUIDELINE_BASE_WIDTH);
  if (isIOS()) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
