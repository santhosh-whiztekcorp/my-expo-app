import { Text, View } from 'react-native';
import { Controller, useFormContext, type FieldValues } from 'react-hook-form';

import { Input } from '../../form/input';
import { type InputControllerProps } from './input-controller.types';

export function InputController<T extends FieldValues>({
  name,
  control: controlProp,
  label,
  description,
  required,
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
            <Text className="text-sm font-medium text-foreground">
              {label}
              {required && <Text className="text-destructive"> *</Text>}
            </Text>
          )}
          {description && <Text className="text-xs text-muted-foreground">{description}</Text>}
          <Input error={error?.message} value={value} onChangeText={onChange} onBlur={onBlur} {...props} />
          {error && <Text className="text-xs text-destructive">{error.message}</Text>}
        </View>
      )}
    />
  );
}
