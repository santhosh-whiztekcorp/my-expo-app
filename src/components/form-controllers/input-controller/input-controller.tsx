import { View } from 'react-native';
import { Controller, useFormContext, type FieldValues } from 'react-hook-form';

import { cn } from '@/lib/cn';

import { CustomText } from '../../custom/custom-text';
import { Input } from '../../form/input';
import { type InputControllerProps } from './input-controller.types';

export function InputController<T extends FieldValues>({
  name,
  control: controlProp,
  label,
  description,
  required,
  labelProps,
  descriptionProps,
  errorProps,
  ...props
}: InputControllerProps<T>) {
  const { control: contextControl } = useFormContext<T>() || {};
  const control = controlProp || contextControl;

  if (!control) {
    console.warn(`InputController: No control or form context found for field "${name}"`);
    return null;
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="gap-2">
          {label && (
            <CustomText variant="span" {...labelProps} className={cn('font-medium text-foreground', labelProps?.className)}>
              {label}
              {required && <CustomText className="text-destructive"> *</CustomText>}
            </CustomText>
          )}
          {description && (
            <CustomText
              variant="span"
              {...descriptionProps}
              className={cn('text-xs text-muted-foreground', descriptionProps?.className)}
            >
              {description}
            </CustomText>
          )}
          <Input error={error?.message} value={value} onChangeText={onChange} onBlur={onBlur} {...props} />
          {error && (
            <CustomText variant="span" {...errorProps} className={cn('text-xs text-destructive', errorProps?.className)}>
              {error.message}
            </CustomText>
          )}
        </View>
      )}
    />
  );
}
