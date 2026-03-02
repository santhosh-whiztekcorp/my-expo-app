import { Text, View } from 'react-native';
import { Link } from 'expo-router';

import { CustomKeyboardAwareScrollView } from '@/components/custom';

import { ForgotPasswordForm } from '../../components';

export function ForgotPasswordScreen() {
  return (
    <CustomKeyboardAwareScrollView contentContainerClassName="flex-grow justify-center p-6" className="bg-background">
      <Text className="mb-4 text-center text-3xl font-bold text-foreground">Forgot Password</Text>
      <Text className="mb-8 text-center text-muted-foreground">
        Enter your email address and we'll send you a link to reset your password.
      </Text>

      <ForgotPasswordForm />

      <View className="mt-8 flex-row justify-center">
        <Text className="text-muted-foreground">Remember your password? </Text>
        <Link href="/login" asChild>
          <Text className="font-bold text-primary">Login</Text>
        </Link>
      </View>
    </CustomKeyboardAwareScrollView>
  );
}
