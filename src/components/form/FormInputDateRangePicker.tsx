import type {IFormInputProps} from '@/core/interfaces/form.interface';
import {FormControl, FormHelperText} from '@mui/material';
import {Controller} from 'react-hook-form';
import DateRangePicker, {
  type DateRangePickerProps,
} from '../ui/date-range-picker';

interface IFormInputDateRangePickerProps
  extends IFormInputProps,
    Omit<DateRangePickerProps, 'value' | 'onChange'> {}

function FormInputDateRangePicker({
  name,
  sx,
  control,
  ...props
}: IFormInputDateRangePickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={renderProps => (
        <FormControl fullWidth error={Boolean(renderProps.fieldState.error)}>
          <DateRangePicker
            value={renderProps.field.value}
            onChange={renderProps.field.onChange}
            sx={sx}
            responsive
            {...props}
          />
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

export default FormInputDateRangePicker;
