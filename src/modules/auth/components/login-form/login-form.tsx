import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { FormProvider } from 'react-hook-form';

import { InputController } from '@/components/form-controllers';
import { Button } from '@/components/primitives';

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

        <View className="flex-row justify-end">
          <Link href={'/forgot-password' as any} asChild>
            <Text className="text-sm font-medium text-primary">Forgot Password?</Text>
          </Link>
        </View>

        <Button label="Login" onPress={onSubmit} loading={isLoginPending} className="mt-4" />
      </View>
    </FormProvider>
  );
}
