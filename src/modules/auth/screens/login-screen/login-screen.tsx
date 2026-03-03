import React from 'react';
import { View } from 'react-native';
import { Link } from 'expo-router';

import { CustomKeyboardAwareScrollView, CustomText } from '@/components/custom';

import { LoginForm } from '../../components';

export function LoginScreen() {
  return (
    <CustomKeyboardAwareScrollView contentContainerClassName="flex-grow justify-center p-6" className="bg-background">
      <CustomText variant="h1" className="mb-8 text-center">
        Login
      </CustomText>

      <LoginForm />

      <View className="mt-8 flex-row justify-center">
        <CustomText className="text-muted-foreground">Don't have an account? </CustomText>
        <Link href="/register" asChild>
          <CustomText className="font-bold text-primary">Register</CustomText>
        </Link>
      </View>
    </CustomKeyboardAwareScrollView>
  );
}
