import React from 'react';
import { View } from 'react-native';
import { FormProvider } from 'react-hook-form';

import { InputController } from '@/components/form-controllers';
import { Button } from '@/components/ui';

import { useLogin, useLoginForm } from '../../hooks';

export function LoginForm() {
  const { loginHandleSubmit, loginMethods } = useLoginForm();
  const { login, isLoginPending } = useLogin();

  const onSubmit = loginHandleSubmit((data) => {
    login(data);
  });

  return (
    <FormProvider {...loginMethods}>
      <View className="gap-4 p-4">
        <InputController
          name="email"
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputController name="password" label="Password" placeholder="Enter your password" secureTextEntry />
        <Button label="Login" onPress={onSubmit} loading={isLoginPending} className="mt-4" />
      </View>
    </FormProvider>
  );
}
