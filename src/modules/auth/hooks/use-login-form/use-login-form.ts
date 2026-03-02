import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { loginSchema } from '../../schemas';
import { type LoginFormValues } from '../../types';

export function useLoginForm(defaultValues?: Partial<LoginFormValues>) {
  const loginMethods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      ...defaultValues,
    },
  });

  return {
    loginMethods,
    loginControl: loginMethods.control,
    loginErrors: loginMethods.formState.errors,
    loginWatch: loginMethods.watch,
    loginReset: loginMethods.reset,
    loginHandleSubmit: loginMethods.handleSubmit,
  };
}
