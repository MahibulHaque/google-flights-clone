import {Person} from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import type {
  IPassengers,
  TypePassenger,
  TypePassengerCountOperation,
} from '../interfaces/passengers.interface';
import PassengerRow from './PassengerRow';

interface IPassengerCountDropdownProps {
  value: IPassengers;
  onChange: (val: IPassengers) => void;
  error?: unknown;
}

export default function PassengerCountDropdown({
  value,
  onChange,
  error,
}: IPassengerCountDropdownProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tempPassengers, setTempPassengers] = useState<IPassengers>(value);

  const handleClose = () => {
    setAnchorEl(null);
    setTempPassengers(value); // Reset to original value on cancel
  };

  const handleDone = () => {
    onChange(tempPassengers);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const updatePassengerCount = (
    type: TypePassenger,
    operation: TypePassengerCountOperation,
  ) => {
    setTempPassengers(prev => {
      const newCount =
        operation === 'increment'
          ? prev[type] + 1
          : Math.max(0, prev[type] - 1);

      // Ensure at least 1 adult
      if (type === 'adults' && newCount < 1) {
        return prev;
      }

      return {
        ...prev,
        [type]: newCount,
      };
    });
  };

  const getTotalPassengers = (passengers = value) => {
    return passengers.adults + passengers.children + passengers.infants;
  };

  const getPassengerSummary = () => {
    const total = getTotalPassengers();
    if (total === 1) return '1 passenger';
    return `${total} passengers`;
  };
  return (
    <>
      <Button
        className="min-h-[56px]"
        size="large"
        variant="outlined"
        onClick={e => {
          setAnchorEl(e.currentTarget);
          setTempPassengers(value); // Reset temp state when opening
        }}
        startIcon={<Person />}
        sx={{
          justifyContent: 'flex-start',
          textTransform: 'none',
          px: 2,
          py: 1.5,
          minWidth: 200,
          color: error ? 'error.main' : 'text.primary',
          borderColor: error ? 'error.main' : 'divider',
          '&:hover': {
            borderColor: error ? 'error.main' : 'primary.main',
          },
        }}>
        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
          <Typography variant="body1">{getPassengerSummary()}</Typography>
          {getTotalPassengers() > 1 && (
            <Chip
              label={getTotalPassengers()}
              size="small"
              sx={{
                height: 20,
                minWidth: 20,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                fontSize: '0.75rem',
              }}
            />
          )}
        </Box>
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              mt: 1,
              boxShadow: 3,
              border: '1px solid',
              borderColor: 'divider',
            },
          },
        }}>
        <Box sx={{p: 2}}>
          <Typography variant="h6" sx={{mb: 2, fontWeight: 600}}>
            Passengers
          </Typography>

          <Stack divider={<Divider />}>
            <PassengerRow
              title="Adults"
              count={tempPassengers.adults}
              type="adults"
              updatePassengerCount={updatePassengerCount}
              minValue={1}
            />

            <PassengerRow
              title="Children"
              subtitle="Aged 2-11"
              count={tempPassengers.children}
              updatePassengerCount={updatePassengerCount}
              type="children"
            />

            <PassengerRow
              title="Infants"
              subtitle="In seat"
              updatePassengerCount={updatePassengerCount}
              count={tempPassengers.infants}
              type="infants"
            />
          </Stack>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1,
              mt: 3,
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}>
            <Button
              variant="text"
              onClick={handleClose}
              sx={{textTransform: 'none'}}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleDone}
              sx={{textTransform: 'none'}}>
              Done
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
