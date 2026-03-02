import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

import { DEFAULT_NOTIFICATION_BEHAVIOR, notificationService } from '@/services/notification-service';

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Set global notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => DEFAULT_NOTIFICATION_BEHAVIOR,
    });

    // Optionally register for tokens or add global listeners here
    const cleanup = notificationService.addListeners({
      onReceived: (notification) => {
        console.log('Notification received:', notification);
      },
      onResponse: (response) => {
        console.log('Notification response:', response);
      },
    });

    return () => {
      cleanup();
    };
  }, []);

  return <>{children}</>;
}
