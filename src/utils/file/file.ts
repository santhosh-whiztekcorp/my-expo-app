import { Directory, File, Paths } from 'expo-file-system';

// Downloads a file from a URL to a local URI.
export async function downloadFile(url: string, filename: string): Promise<string | null> {
  const file = new File(Paths.document, filename);
  try {
    const downloadedFile = await File.downloadFileAsync(url, file);
    return downloadedFile.uri;
  } catch (error) {
    console.error('Error downloading file:', error);
    return null;
  }
}

// Deletes a file at the given URI.
export async function deleteFile(uri: string): Promise<boolean> {
  try {
    await new File(uri).delete();
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}

// Gets info about a file or directory.
export async function getFileInfo(uri: string): Promise<unknown | null> {
  try {
    const info = await new File(uri).info();
    return info;
  } catch (error) {
    console.error('Error getting file info:', error);
    return null;
  }
}

// Ensures a directory exists, creating it if necessary.
export async function ensureDirectoryExists(dirPath: string): Promise<boolean> {
  try {
    const dir = new Directory(dirPath);
    if (!dir.exists) {
      await dir.create({ intermediates: true, idempotent: true });
    }
    return true;
  } catch (error) {
    console.error('Error ensuring directory exists:', error);
    return false;
  }
}
