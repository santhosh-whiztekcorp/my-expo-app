import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { fileService } from '@/services/file-service';
import { notificationService } from '@/services/notification-service';
import { toast } from '@/utils/toast';

export function Experiment() {
  const handleToastTypes = () => {
    toast.success('Success toast');
    toast.error('Error toast');
    toast.info('Info toast');
    toast.warning('Warning toast');
  };

  const handleLocalNotification = async () => {
    await notificationService.scheduleLocalNotification(
      'Local Notification',
      'This is a test local notification.',
      { source: 'experiment' },
      2,
    );
    toast.info('Local notification scheduled');
  };

  const handleFileDownload = async () => {
    // Try a more reliable test URL (small JSON file)
    const testUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    const filename = 'test-post.json';
    console.log('Starting download:', testUrl);
    try {
      const uri = await fileService.downloadFile({ url: testUrl, filename });
      if (uri) {
        toast.success(`Downloaded: ${filename}`);
        console.log('Downloaded to:', uri);
      } else {
        toast.error('Download failed');
      }
    } catch (err) {
      console.error('Download error:', err);
      toast.error('Download error');
    }
  };

  const handlePushNotification = async () => {
    const token = await notificationService.registerForPushNotifications();
    if (token) {
      Alert.alert('Push Token', token);
      toast.success('Push token registered');
    } else {
      toast.error('Failed to register for push notifications');
    }
  };

  return (
    <View className="rounded-2xl border border-secondary bg-secondary/20 p-6">
      <Text className="mb-4 text-lg font-semibold text-foreground">Experiment</Text>

      <TouchableOpacity onPress={handleToastTypes} className="mb-3 h-12 items-center justify-center rounded-xl bg-primary">
        <Text className="text-base font-semibold text-primary-foreground">Test All Toast Types</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLocalNotification} className="mb-3 h-12 items-center justify-center rounded-xl bg-accent">
        <Text className="text-base font-semibold text-accent-foreground">Test Local Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleFileDownload} className="mb-3 h-12 items-center justify-center rounded-xl bg-muted">
        <Text className="text-base font-semibold text-muted-foreground">Test File Download</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePushNotification} className="h-12 items-center justify-center rounded-xl bg-destructive">
        <Text className="text-base font-semibold text-destructive-foreground">Test Push Notification</Text>
      </TouchableOpacity>
    </View>
  );
}
