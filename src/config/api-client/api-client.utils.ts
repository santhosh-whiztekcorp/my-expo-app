import axios from 'axios';
import { router } from 'expo-router';

import { secureStorageService } from '@/services/secure-storage-service';

import { API_CLIENT_CONSTANTS } from './api-client.constants';
import { ApiLogData } from './api-client.types';

export function logInteraction(data: ApiLogData) {
  if (!API_CLIENT_CONSTANTS.ENABLE_LOGS) return;

  const { method, url, duration, requestData, responseData, error } = data;

  const isIgnored = API_CLIENT_CONSTANTS.LOG_IGNORED_URLS.some((ignoredUrl) => url?.includes(ignoredUrl));
  if (isIgnored) return;

  const logData = {
    Method: method,
    Endpoint: url,
    Duration: duration,
    Request: requestData,
    Response: responseData,
    Error: error,
  };

  if (error) {
    console.log('❌ API LOG:', JSON.stringify(logData, null, 2));
  } else {
    console.log('✅ API LOG:', JSON.stringify(logData, null, 2));
  }
}

export async function getAccessToken() {
  return await secureStorageService.getAccessToken();
}

export async function getRefreshToken() {
  return await secureStorageService.getRefreshToken();
}

export async function setAccessAndRefreshTokens(accessToken: string, refreshToken: string) {
  await Promise.all([secureStorageService.setAccessToken(accessToken), secureStorageService.setRefreshToken(refreshToken)]);
}

export async function refreshTokenRequest(refreshToken: string) {
  const response = await axios.post(
    `${API_CLIENT_CONSTANTS.BASE_URL}${API_CLIENT_CONSTANTS.REFRESH_TOKEN_URL}`,
    { refreshToken },
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  return response.data;
}

export async function handleLogout() {
  try {
    const refreshToken = await getRefreshToken();
    if (refreshToken) {
      await axios.post(
        `${API_CLIENT_CONSTANTS.BASE_URL}${API_CLIENT_CONSTANTS.LOGOUT_URL}`,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );
    }
  } catch {
    // Silently fail API logout
  } finally {
    await secureStorageService.clearAuth();
    router.replace(API_CLIENT_CONSTANTS.LOGOUT_REDIRECT_ROUTE);
  }
}
