import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { registerSchema } from '../../schemas';
import { type RegisterFormValues } from '../../types';

export function useRegisterForm(defaultValues?: Partial<RegisterFormValues>) {
  const registerMethods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      ...defaultValues,
    },
  });

  return {
    registerMethods,
    registerControl: registerMethods.control,
    registerErrors: registerMethods.formState.errors,
    registerWatch: registerMethods.watch,
    registerReset: registerMethods.reset,
    registerHandleSubmit: registerMethods.handleSubmit,
  };
}
