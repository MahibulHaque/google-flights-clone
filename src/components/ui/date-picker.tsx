import {Calendar} from '@/components/ui/calendar';
import { CalendarToday } from '@mui/icons-material';
import {Popover} from '@mui/material';
import Button from '@mui/material/Button';
import {format} from 'date-fns';
import {useRef, useState} from 'react';

interface IDatepickerProps {
  value: Date;
  onChange: (value: Date) => void;
}

export function DatePicker({value, onChange}: IDatepickerProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDateSelect = (v?: Date) => {
    if (!v) {
      return;
    }
    onChange(v);
  };

  return (
    <>
      <Button
        ref={ref}
        size="large"
        color={'inherit'}
        variant="outlined"
        className="w-full justify-between!"
        onClick={handleOpen}
        endIcon={<CalendarToday />}>
        {value ? format(value, 'PPP') : <span>Pick a date</span>}
      </Button>
      <Popover
        anchorEl={ref.current}
        open={open}
        onClose={handleClose}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}>
        <Calendar
          defaultMonth={value}
          mode="single"
          selected={value}
          onSelect={v => {
            onDateSelect(v);
          }}
        />
      </Popover>
    </>
  );
}
