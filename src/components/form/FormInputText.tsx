import type { IFormInputProps } from '@/core/interfaces/form.interface';
import {TextField, type OutlinedTextFieldProps} from '@mui/material';
import {Controller} from 'react-hook-form';

interface IFormInputTextProps
  extends Omit<OutlinedTextFieldProps, 'label' | 'name' | 'variant'>,
    IFormInputProps {}

function FormInputText({
  name,
  control,
  label,
  sx,
  size,
  ...props
}: IFormInputTextProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={renderProps => (
        <TextField
          size={size}
          onChange={renderProps.field.onChange}
          value={renderProps.field.value}
          error={Boolean(renderProps.fieldState.error)}
          helperText={renderProps.fieldState.error?.message ?? null}
          fullWidth
          label={label}
          variant="outlined"
          sx={sx}
          {...props}
        />
      )}
    />
  );
}

export default FormInputText;
