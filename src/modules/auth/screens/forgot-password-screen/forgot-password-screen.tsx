import { View } from 'react-native';
import { Link } from 'expo-router';

import { CustomKeyboardAwareScrollView, CustomText } from '@/components/custom';

import { ForgotPasswordForm } from '../../components';

export function ForgotPasswordScreen() {
  return (
    <CustomKeyboardAwareScrollView contentContainerClassName="flex-grow justify-center p-6" className="bg-background">
      <CustomText variant="h1" className="mb-4 text-center">
        Forgot Password
      </CustomText>
      <CustomText className="mb-8 text-center text-muted-foreground">
        Enter your email address and we'll send you a link to reset your password.
      </CustomText>

      <ForgotPasswordForm />

      <View className="mt-8 flex-row justify-center">
        <CustomText className="text-muted-foreground">Remember your password? </CustomText>
        <Link href="/login" asChild>
          <CustomText className="font-bold text-primary">Login</CustomText>
        </Link>
      </View>
    </CustomKeyboardAwareScrollView>
  );
}
