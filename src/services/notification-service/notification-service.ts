import { isAndroid, isPhysicalDevice } from '@/utils/device';
import { getProjectId } from '@/utils/project';

import { NOTIFICATION_CHANNELS } from './notification-service.constants';
import { NotificationListeners } from './notification-service.types';
import { notificationAdapter } from './notification-service.utils';

export const notificationService = {
  async registerForPushNotifications(): Promise<string | undefined> {
    if (isAndroid()) {
      await notificationAdapter.setupAndroidChannel(NOTIFICATION_CHANNELS.DEFAULT);
    }

    if (!isPhysicalDevice()) {
      console.warn('Must use physical device for Push Notifications');
      return undefined;
    }

    const { status: existingStatus } = await notificationAdapter.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await notificationAdapter.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Failed to get push token for push notification!');
      return undefined;
    }

    try {
      const projectId = getProjectId();
      if (!projectId) {
        throw new Error('Project ID not found in configuration');
      }
      return await notificationAdapter.getExpoPushTokenAsync(projectId);
    } catch (error) {
      console.error('Error fetching push token:', error);
      return undefined;
    }
  },

  async scheduleLocalNotification(title: string, body: string, data: Record<string, unknown> = {}, seconds = 2) {
    await notificationAdapter.scheduleLocalNotification(title, body, data, seconds);
  },

  addListeners({ onReceived, onResponse }: NotificationListeners) {
    const notificationListener = notificationAdapter.addNotificationReceivedListener((notification) => {
      onReceived?.(notification);
    });

    const responseListener = notificationAdapter.addNotificationResponseReceivedListener((response) => {
      onResponse?.(response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  },
};
