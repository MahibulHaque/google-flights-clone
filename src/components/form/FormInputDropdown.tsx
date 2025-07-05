import type {IFormInputDropdown} from '@/core/interfaces/form.interface';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  type BaseSelectProps,
} from '@mui/material';
import {Controller} from 'react-hook-form';

interface IFormInputDropdownProps
  extends Omit<BaseSelectProps, 'label' | 'name'>,
    IFormInputDropdown {}

function FormInputDropdown({
  name,
  control,
  label,
  sx,
  options,
  ...props
}: IFormInputDropdownProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={renderProps => (
        <FormControl fullWidth error={Boolean(renderProps.fieldState.error)}>
          {label && (
            <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
          )}
          <Select
            id={name}
            value={renderProps.field.value}
            label={label}
            sx={sx}
            onChange={renderProps.field.onChange}
            {...props}>
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
          {renderProps.fieldState.error && (
            <FormHelperText>
              {renderProps.fieldState.error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

export default FormInputDropdown;
