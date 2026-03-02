import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { resetPasswordSchema } from '../../schemas';
import { type ResetPasswordFormValues } from '../../types';

export function useResetPasswordForm(defaultValues?: Partial<ResetPasswordFormValues>) {
  const methods = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      ...defaultValues,
    },
  });

  return {
    resetPasswordMethods: methods,
    resetPasswordControl: methods.control,
    resetPasswordErrors: methods.formState.errors,
    resetPasswordHandleSubmit: methods.handleSubmit,
  };
}
