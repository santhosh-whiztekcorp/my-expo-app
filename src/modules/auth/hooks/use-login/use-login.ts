import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { ROUTES } from '@/constants/routes';

import { authService } from '../../services';
import { useAuthStore } from '../../store';
import { AuthResponse } from '../../types';

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: authService.login,
    onSuccess: async (data: AuthResponse) => {
      await setAuth(data.user, data.token);
      router.replace(ROUTES.MAIN.HOME);
    },
  });

  return {
    login: mutate,
    isLoginPending: isPending,
    isLoginError: isError,
    isLoginSuccess: isSuccess,
    loginErrorMessage: error?.message,
  };
}
