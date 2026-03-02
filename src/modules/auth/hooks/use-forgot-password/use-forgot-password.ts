import { useMutation } from '@tanstack/react-query';

import { authService } from '../../services';

export function useForgotPassword() {
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: authService.forgotPassword,
  });

  return {
    forgotPassword: mutate,
    isForgotPasswordPending: isPending,
    isForgotPasswordError: isError,
    isForgotPasswordSuccess: isSuccess,
    forgotPasswordErrorMessage: error?.message,
  };
}
