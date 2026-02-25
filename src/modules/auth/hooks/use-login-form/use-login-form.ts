import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { loginSchema, type LoginFormValues } from '../../schemas';

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
