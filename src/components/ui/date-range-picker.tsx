import {Calendar} from '@/components/ui/calendar';
import {cn} from '@/lib/utils/cn';
import {Button, Popover, type SxProps} from '@mui/material';
import type {Theme} from '@mui/material/styles';
import {format} from 'date-fns';
import {CalendarIcon} from 'lucide-react';
import {useRef, useState} from 'react';
import type {DateRange} from 'react-day-picker';

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (date: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  numberOfMonths?: number;
  minDate?: Date;
  maxDate?: Date;
  responsive?: boolean;
  sx?: SxProps<Theme>;
}

export default function DateRangePicker({
  value,
  onChange,
  placeholder = 'Pick a date range',
  disabled = false,
  className,
  numberOfMonths = 2, // Changed default to 1
  minDate,
  maxDate,
  responsive = true,
  sx,
}: Readonly<DateRangePickerProps>) {
  const anchorEl = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  // Determine number of months based on screen size if responsive
  const getNumberOfMonths = () => {
    if (!responsive) return numberOfMonths;

    // Use 1 month on mobile, 2 on larger screens
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 1 : numberOfMonths;
    }
    return numberOfMonths;
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Button
        ref={anchorEl}
        id="date"
        size="large"
        color="inherit"
        variant="outlined"
        onClick={handleClick}
        disabled={disabled}
        endIcon={<CalendarIcon />}
        className={cn('w-full flex! items-center justify-between!')}>
        {value?.from && value?.to && (
          <>
            {format(value.from, 'MMM dd, y')} - {format(value.to, 'MMM dd, y')}
          </>
        )}
        {value?.from && !value.to && format(value.from, 'MMM dd, y')}

        {!value?.from && !value?.to && <span>{placeholder}</span>}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <Calendar
          autoFocus
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={getNumberOfMonths()}
          disabled={date => {
            if (minDate && date < minDate) return true;
            if (maxDate && date > maxDate) return true;
            return false;
          }}
          className="rounded-md"
          data-slot="popover-content"
        />
      </Popover>
    </div>
  );
}
