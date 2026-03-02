import React from 'react';
import { View } from 'react-native';
import { FormProvider } from 'react-hook-form';

import { InputController } from '@/components/form-controllers';
import { Button } from '@/components/primitives';

import { useResetPassword, useResetPasswordForm } from '../../hooks';

export function ResetPasswordForm() {
  const { resetPasswordHandleSubmit, resetPasswordMethods } = useResetPasswordForm();
  const { resetPassword, isResetPasswordPending } = useResetPassword();

  const onSubmit = resetPasswordHandleSubmit((data) => {
    resetPassword(data);
  });

  return (
    <FormProvider {...resetPasswordMethods}>
      <View className="gap-4">
        <InputController name="password" label="New Password" placeholder="Enter new password" secureTextEntry />
        <InputController name="confirmPassword" label="Confirm Password" placeholder="Confirm new password" secureTextEntry />
        <Button label="Reset Password" onPress={onSubmit} loading={isResetPasswordPending} className="mt-4" />
      </View>
    </FormProvider>
  );
}
