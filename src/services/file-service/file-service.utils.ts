import { Directory, File } from 'expo-file-system';

export const fileAdapter = {
  async downloadFile(url: string, destination: File) {
    return File.downloadFileAsync(url, destination);
  },

  async delete(uri: string): Promise<void> {
    await new File(uri).delete();
  },

  async getInfo(uri: string): Promise<unknown> {
    return new File(uri).info();
  },

  async ensureDirectory(dirPath: string): Promise<void> {
    const dir = new Directory(dirPath);
    if (!dir.exists) {
      await dir.create({ intermediates: true, idempotent: true });
    }
  },
};
