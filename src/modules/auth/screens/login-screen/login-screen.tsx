import React from 'react';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

import { CustomKeyboardAwareScrollView } from '@/components/custom';

import { LoginForm } from '../../components';

export function LoginScreen() {
  return (
    <CustomKeyboardAwareScrollView contentContainerClassName="flex-grow justify-center p-6" className="bg-background">
      <Text className="mb-8 text-center text-3xl font-bold text-foreground">Login</Text>

      <LoginForm />

      <View className="mt-8 flex-row justify-center">
        <Text className="text-muted-foreground">Don't have an account? </Text>
        <Link href="/register" asChild>
          <Text className="font-bold text-primary">Register</Text>
        </Link>
      </View>
    </CustomKeyboardAwareScrollView>
  );
}
