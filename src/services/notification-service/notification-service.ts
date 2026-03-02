import * as Notifications from 'expo-notifications';

import { isAndroid, isPhysicalDevice } from '@/utils/device';
import { getProjectId } from '@/utils/project';

import { NOTIFICATION_CHANNELS } from './notification-service.constants';
import { NotificationListeners } from './notification-service.types';

export const notificationService = {
  async registerForPushNotifications(): Promise<string | undefined> {
    if (isAndroid()) {
      await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.DEFAULT, {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (!isPhysicalDevice()) {
      console.warn('Must use physical device for Push Notifications');
      return undefined;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
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
      const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      return token;
    } catch (error) {
      console.error('Error fetching push token:', error);
      return undefined;
    }
  },

  async scheduleLocalNotification(title: string, body: string, data: Record<string, unknown> = {}, seconds = 2) {
    await Notifications.scheduleNotificationAsync({
      content: { title, body, data },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds,
      },
    });
  },

  addListeners({ onReceived, onResponse }: NotificationListeners) {
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      onReceived?.(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      onResponse?.(response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  },
};
