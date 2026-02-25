import React from 'react';
import { View } from 'react-native';
import { FormProvider } from 'react-hook-form';

import { InputController } from '@/components/form-controllers';
import { Button } from '@/components/ui';

import { useRegister, useRegisterForm } from '../../hooks';

export function RegisterForm() {
  const { registerHandleSubmit, registerMethods } = useRegisterForm();
  const { register, isRegisterPending } = useRegister();

  const onSubmit = registerHandleSubmit((data) => {
    register(data);
  });

  return (
    <FormProvider {...registerMethods}>
      <View className="gap-5 p-4">
        <InputController name="fullName" label="Full Name" placeholder="Enter your full name" />
        <InputController
          name="email"
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputController name="password" label="Password" placeholder="Enter your password" secureTextEntry />
        <InputController name="confirmPassword" label="Confirm Password" placeholder="Confirm your password" secureTextEntry />
        <Button label="Register" onPress={onSubmit} loading={isRegisterPending} className="mt-4" />
      </View>
    </FormProvider>
  );
}
