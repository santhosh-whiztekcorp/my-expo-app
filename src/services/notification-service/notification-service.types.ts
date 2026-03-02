import * as Notifications from 'expo-notifications';

export type NotificationListeners = {
  onReceived?: (notification: Notifications.Notification) => void;
  onResponse?: (response: Notifications.NotificationResponse) => void;
};
