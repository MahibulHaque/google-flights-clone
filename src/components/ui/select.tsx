import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {type BaseSelectProps} from '@mui/material/Select';

export interface ISelectOption {
  title: string;
  value: string | number | readonly string[];
}

export type ISelectProps = BaseSelectProps & {
  name: string;
  options: ISelectOption[];
};

const CustomSelect = ({
  name,
  onChange,
  value,
  label,
  options,
  ...props
}: ISelectProps) => {
  return (
    <FormControl fullWidth>
      {label && <InputLabel id={`${label}-select-label`}>{label}</InputLabel>}
      <Select
        id={name}
        value={value}
        label={label}
        onChange={onChange}
        {...props}>
        {options.map(option => (
          <MenuItem key={option.title} value={option.value}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
