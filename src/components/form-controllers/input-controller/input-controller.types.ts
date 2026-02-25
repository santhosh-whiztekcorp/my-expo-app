import { type Control, type FieldValues, type Path } from 'react-hook-form';

import { type InputProps } from '../../form/input';

export type InputControllerProps<T extends FieldValues> = Omit<InputProps, 'value' | 'onChangeText' | 'error'> & {
  name: Path<T>;
  control?: Control<T>;
  label?: string;
  description?: string;
  required?: boolean;
};
