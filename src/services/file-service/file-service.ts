import { File, Paths } from 'expo-file-system';

import { notificationService } from '@/services/notification-service';
import { toast } from '@/utils/toast';

import type { DownloadFileParams } from './file-service.types';
import { fileAdapter } from './file-service.utils';

export const fileService = {
  // Downloads a file from a URL to a local URI.
  async downloadFile({
    url,
    filename,
    options = { showToast: true, showNotification: true },
  }: DownloadFileParams): Promise<string | null> {
    // Generate a unique filename with timestamp
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${filename}`;
    const file = new File(Paths.document, uniqueFilename);

    try {
      // 1. Show immediate UI feedback
      if (options.showToast) {
        toast.info(`Downloading ${filename}...`);
      }

      // 2. Schedule a notification to appear in the device center
      if (options.showNotification) {
        await notificationService.scheduleLocalNotification(
          'Download Started',
          `Downloading ${uniqueFilename}...`,
          { action: 'download_started', filename: uniqueFilename },
          1, // Show almost immediately
        );
      }

      const downloadedFile = await fileAdapter.downloadFile(url, file);

      // 3. Success feedback
      if (options.showToast) {
        toast.success(`${filename} downloaded successfully!`);
      }

      if (options.showNotification) {
        await notificationService.scheduleLocalNotification(
          'Download Complete',
          `${uniqueFilename} has been saved to your device.`,
          { action: 'download_complete', uri: downloadedFile.uri },
          1,
        );
      }

      return downloadedFile.uri;
    } catch (error) {
      console.error('Error downloading file:', error);

      // 4. Error feedback
      if (options.showToast) {
        toast.error(`Failed to download ${filename}`);
      }

      if (options.showNotification) {
        await notificationService.scheduleLocalNotification(
          'Download Failed',
          `There was an error downloading ${filename}.`,
          { action: 'download_error', error: String(error) },
          1,
        );
      }

      return null;
    }
  },

  // Deletes a file at the given URI.
  async deleteFile(uri: string): Promise<boolean> {
    try {
      await fileAdapter.delete(uri);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  },

  // Gets info about a file or directory.
  async getFileInfo(uri: string): Promise<unknown | null> {
    try {
      const info = await fileAdapter.getInfo(uri);
      return info;
    } catch (error) {
      console.error('Error getting file info:', error);
      return null;
    }
  },

  // Ensures a directory exists, creating it if necessary.
  async ensureDirectoryExists(dirPath: string): Promise<boolean> {
    try {
      await fileAdapter.ensureDirectory(dirPath);
      return true;
    } catch (error) {
      console.error('Error ensuring directory exists:', error);
      return false;
    }
  },
};
