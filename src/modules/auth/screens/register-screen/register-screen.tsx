import React from 'react';
import { View } from 'react-native';
import { Link } from 'expo-router';

import { CustomKeyboardAwareScrollView, CustomText } from '@/components/custom';

import { RegisterForm } from '../../components';

export function RegisterScreen() {
  return (
    <CustomKeyboardAwareScrollView contentContainerClassName="flex-grow justify-center p-6" className="bg-background">
      <CustomText variant="h1" className="mb-8 text-center text-foreground">
        Create Account
      </CustomText>

      <RegisterForm />

      <View className="mt-8 flex-row justify-center">
        <CustomText className="text-muted-foreground">Already have an account? </CustomText>
        <Link href="/login" asChild>
          <CustomText className="font-bold text-primary">Login</CustomText>
        </Link>
      </View>
    </CustomKeyboardAwareScrollView>
  );
}
