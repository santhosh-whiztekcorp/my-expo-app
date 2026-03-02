import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { ROUTES } from '@/constants/routes';

import { authService } from '../../services';

export function useResetPassword() {
  const router = useRouter();

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      router.replace(ROUTES.AUTH.LOGIN);
    },
  });

  return {
    resetPassword: mutate,
    isResetPasswordPending: isPending,
    isResetPasswordError: isError,
    isResetPasswordSuccess: isSuccess,
    resetPasswordErrorMessage: error?.message,
  };
}
