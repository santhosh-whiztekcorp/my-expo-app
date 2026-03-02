import React from 'react';
import { View } from 'react-native';
import { FormProvider } from 'react-hook-form';

import { InputController } from '@/components/form-controllers';
import { Button } from '@/components/primitives';

import { useForgotPassword, useForgotPasswordForm } from '../../hooks';

export function ForgotPasswordForm() {
  const { forgotPasswordHandleSubmit, forgotPasswordMethods } = useForgotPasswordForm();
  const { forgotPassword, isForgotPasswordPending } = useForgotPassword();

  const onSubmit = forgotPasswordHandleSubmit((data) => {
    forgotPassword(data);
  });

  return (
    <FormProvider {...forgotPasswordMethods}>
      <View className="gap-4">
        <InputController
          name="email"
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button label="Send Reset Link" onPress={onSubmit} loading={isForgotPasswordPending} className="mt-4" />
      </View>
    </FormProvider>
  );
}
