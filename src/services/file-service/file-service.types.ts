export type DownloadOptions = {
  showToast?: boolean;
  showNotification?: boolean;
};

export type DownloadFileParams = {
  url: string;
  filename: string;
  options?: DownloadOptions;
};
