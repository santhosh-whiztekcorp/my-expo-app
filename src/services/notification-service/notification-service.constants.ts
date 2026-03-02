import * as Notifications from 'expo-notifications';

export const NOTIFICATION_CHANNELS = {
  DEFAULT: 'default',
} as const;

export const DEFAULT_NOTIFICATION_BEHAVIOR: Notifications.NotificationBehavior = {
  shouldShowAlert: true,
  shouldShowBanner: true,
  shouldShowList: true,
  shouldPlaySound: true,
  shouldSetBadge: true,
};
