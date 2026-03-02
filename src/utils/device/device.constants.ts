import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
export const GUIDELINE_BASE_WIDTH = 375;
export const GUIDELINE_BASE_HEIGHT = 812;

export const WINDOW_WIDTH = SCREEN_WIDTH;
export const WINDOW_HEIGHT = SCREEN_HEIGHT;

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  LAPTOP: 1440,
};
