import { InternalAxiosRequestConfig } from 'axios';

export type ApiLogData = {
  method?: string;
  url?: string;
  duration?: string;
  requestData?: unknown;
  responseData?: unknown;
  error?: unknown;
};

export interface ExtendedInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _startTime?: number;
}
