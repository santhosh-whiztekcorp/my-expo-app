import { apiClient } from '@/config/api-client';

import { AUTH_API_ENDPOINTS } from '../constants';
import { LoginFormValues, RegisterFormValues } from '../schemas';
import { AuthResponse } from '../types';

export const authService = {
  login: async (data: LoginFormValues): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(AUTH_API_ENDPOINTS.LOGIN, data);
    return response.data;
  },

  register: async (data: RegisterFormValues): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(AUTH_API_ENDPOINTS.REGISTER, data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(AUTH_API_ENDPOINTS.LOGOUT);
  },

  getMe: async (): Promise<AuthResponse['user']> => {
    const response = await apiClient.get<AuthResponse['user']>(AUTH_API_ENDPOINTS.ME);
    return response.data;
  },
};
