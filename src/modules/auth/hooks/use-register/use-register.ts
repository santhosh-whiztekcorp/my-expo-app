import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { ROUTES } from '@/constants/routes';

import { authService } from '../../services';
import { useAuthStore } from '../../store';
import { AuthResponse } from '../../types';

export function useRegister() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: authService.register,
    onSuccess: async (data: AuthResponse) => {
      await setAuth(data.user, data.token);
      router.replace(ROUTES.MAIN.HOME);
    },
  });

  return {
    register: mutate,
    isRegisterPending: isPending,
    isRegisterError: isError,
    isRegisterSuccess: isSuccess,
    registerErrorMessage: error?.message,
  };
}
