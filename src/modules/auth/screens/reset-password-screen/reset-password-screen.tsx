import { CustomKeyboardAwareScrollView, CustomText } from '@/components/custom';

import { ResetPasswordForm } from '../../components';

export function ResetPasswordScreen() {
  return (
    <CustomKeyboardAwareScrollView contentContainerClassName="flex-grow justify-center p-6" className="bg-background">
      <CustomText variant="h1" className="mb-4 text-center">
        Reset Password
      </CustomText>
      <CustomText className="mb-8 text-center text-muted-foreground">Please enter your new password below.</CustomText>

      <ResetPasswordForm />
    </CustomKeyboardAwareScrollView>
  );
}
