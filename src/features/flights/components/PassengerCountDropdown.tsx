import {Person} from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import PassengerRow from './PassengerRow';

export default function PassengerCountDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const updatePassengerCount = (type, operation) => {
    setPassengers(prev => {
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

  const getTotalPassengers = () => {
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
        className="min-h-[56px]!"
        size="large"
        variant="outlined"
        onClick={handleClick}
        startIcon={<Person />}
        sx={{
          justifyContent: 'flex-start',
          textTransform: 'none',
          px: 2,
          py: 1.5,
          minWidth: 200,
          color: 'text.primary',
          borderColor: 'divider',
          '&:hover': {
            borderColor: 'primary.main',
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
              count={passengers.adults}
              type="adults"
              updatePassengerCount={updatePassengerCount}
              minValue={1}
            />

            <PassengerRow
              title="Children"
              subtitle="Aged 2-11"
              count={passengers.children}
              updatePassengerCount={updatePassengerCount}
              type="children"
            />

            <PassengerRow
              title="Infants"
              subtitle="In seat"
              updatePassengerCount={updatePassengerCount}
              count={passengers.infants}
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
              onClick={handleClose}
              sx={{textTransform: 'none'}}>
              Done
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
