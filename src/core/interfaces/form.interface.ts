import type {SxProps} from '@mui/material';
import type {Theme} from '@mui/material/styles';
import type {Control} from 'react-hook-form';

export interface IFormInputProps {
  name: string;
  control: Control;
  label: string;
  setValue?: unknown;
  sx?: SxProps<Theme>;
}

export interface IFormInputDropdown extends IFormInputProps {
  options: Array<{title: string; value: string | number}>;
}
