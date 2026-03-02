import * as Notifications from 'expo-notifications';

export const NOTIFICATION_CHANNELS = {
  DEFAULT: 'default',
} as const;

export const ANDROID_NOTIFICATION_CHANNEL_CONFIG: Notifications.NotificationChannelInput = {
  name: 'Default',
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: '#FF231F7C',
};

export const LOCAL_NOTIFICATION_TRIGGER_TYPE = Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL;

export const DEFAULT_NOTIFICATION_BEHAVIOR: Notifications.NotificationBehavior = {
  shouldShowAlert: true,
  shouldShowBanner: true,
  shouldShowList: true,
  shouldPlaySound: true,
  shouldSetBadge: true,
};
