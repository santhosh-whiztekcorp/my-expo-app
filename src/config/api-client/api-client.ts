import axios from 'axios';

import { API_CLIENT_CONSTANTS } from './api-client.constants';
import { ExtendedInternalAxiosRequestConfig } from './api-client.types';
import {
  getAccessToken,
  getRefreshToken,
  handleLogout,
  logInteraction,
  refreshTokenRequest,
  setAccessAndRefreshTokens,
} from './api-client.utils';

export const apiClient = axios.create({
  baseURL: API_CLIENT_CONSTANTS.BASE_URL,
  timeout: API_CLIENT_CONSTANTS.TIMEOUT,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.request.use(
  async (config: ExtendedInternalAxiosRequestConfig) => {
    config._startTime = Date.now();

    const token = await getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    const config = response.config as ExtendedInternalAxiosRequestConfig;
    logInteraction({
      method: config.method,
      url: config.url,
      duration: config._startTime ? `${Date.now() - config._startTime}ms` : 'unknown',
      requestData: config.data,
      responseData: response.data,
    });
    return response;
  },
  async (error) => {
    const config = error.config as ExtendedInternalAxiosRequestConfig;
    logInteraction({
      method: config?.method,
      url: config?.url,
      duration: config?._startTime ? `${Date.now() - config._startTime}ms` : 'unknown',
      error: error.response?.data || error.message,
    });

    const originalRequest = config as ExtendedInternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized (Token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw error;

        const { data } = await refreshTokenRequest(refreshToken);
        await setAccessAndRefreshTokens(data.accessToken, data.refreshToken || refreshToken);

        processQueue(null, data.accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await handleLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
