import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { forgotPasswordSchema } from '../../schemas';
import { type ForgotPasswordFormValues } from '../../types';

export function useForgotPasswordForm(defaultValues?: Partial<ForgotPasswordFormValues>) {
  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
      ...defaultValues,
    },
  });

  return {
    forgotPasswordMethods: methods,
    forgotPasswordControl: methods.control,
    forgotPasswordErrors: methods.formState.errors,
    forgotPasswordHandleSubmit: methods.handleSubmit,
  };
}
