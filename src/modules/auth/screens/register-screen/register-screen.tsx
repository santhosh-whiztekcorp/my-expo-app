import React from 'react';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

import { CustomKeyboardAwareScrollView } from '@/components/custom';

import { RegisterForm } from '../../components';

export function RegisterScreen() {
  return (
    <CustomKeyboardAwareScrollView contentContainerClassName="flex-grow justify-center p-6" className="bg-background">
      <Text className="mb-8 text-center text-3xl font-bold text-foreground">Create Account</Text>

      <RegisterForm />

      <View className="mt-8 flex-row justify-center">
        <Text className="text-muted-foreground">Already have an account? </Text>
        <Link href="/login" asChild>
          <Text className="font-bold text-primary">Login</Text>
        </Link>
      </View>
    </CustomKeyboardAwareScrollView>
  );
}
