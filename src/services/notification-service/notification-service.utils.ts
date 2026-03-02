import * as Notifications from 'expo-notifications';

import { ANDROID_NOTIFICATION_CHANNEL_CONFIG, LOCAL_NOTIFICATION_TRIGGER_TYPE } from './notification-service.constants';

export const notificationAdapter = {
  async setupAndroidChannel(channelId: string) {
    return Notifications.setNotificationChannelAsync(channelId, {
      ...ANDROID_NOTIFICATION_CHANNEL_CONFIG,
    });
  },

  async getPermissionsAsync() {
    return Notifications.getPermissionsAsync();
  },

  async requestPermissionsAsync() {
    return Notifications.requestPermissionsAsync();
  },

  async getExpoPushTokenAsync(projectId: string) {
    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    return token.data;
  },

  async scheduleLocalNotification(title: string, body: string, data: Record<string, unknown>, seconds: number) {
    return Notifications.scheduleNotificationAsync({
      content: { title, body, data },
      trigger: {
        type: LOCAL_NOTIFICATION_TRIGGER_TYPE,
        seconds,
      },
    });
  },

  addNotificationReceivedListener(listener: (event: Notifications.Notification) => void) {
    return Notifications.addNotificationReceivedListener(listener);
  },

  addNotificationResponseReceivedListener(listener: (event: Notifications.NotificationResponse) => void) {
    return Notifications.addNotificationResponseReceivedListener(listener);
  },
};
