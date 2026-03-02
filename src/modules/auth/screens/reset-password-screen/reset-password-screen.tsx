import { Text } from 'react-native';

import { CustomKeyboardAwareScrollView } from '@/components/custom';

import { ResetPasswordForm } from '../../components';

export function ResetPasswordScreen() {
  return (
    <CustomKeyboardAwareScrollView contentContainerClassName="flex-grow justify-center p-6" className="bg-background">
      <Text className="mb-4 text-center text-3xl font-bold text-foreground">Reset Password</Text>
      <Text className="mb-8 text-center text-muted-foreground">Please enter your new password below.</Text>

      <ResetPasswordForm />
    </CustomKeyboardAwareScrollView>
  );
}
