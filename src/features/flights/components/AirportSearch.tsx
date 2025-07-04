import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {Autocomplete, Box, IconButton, TextField} from '@mui/material';
import {useState} from 'react';

const airportOptions = [
  {label: 'Dhaka', code: 'DAC'},
  {label: 'Dubai', code: 'DXB'},
  {label: 'Doha', code: 'DOH'},
  {label: 'New York', code: 'JFK'},
];

export default function AirportSearch() {
  const [from, setFrom] = useState(airportOptions[0]);
  const [to, setTo] = useState(airportOptions[1]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Box
      position="relative"
      width="100%"
      display="flex"
      alignItems="center"
      gap={1}>
      {/* From Field */}
      <Autocomplete
        forcePopupIcon={false}
        fullWidth
        options={airportOptions}
        value={from}
        onChange={(_, newValue) => setFrom(newValue)}
        getOptionLabel={option => option.label}
        renderInput={params => <TextField {...params} label="From" />}
      />

      {/* Swap Button */}
      <IconButton
        onClick={handleSwap}
        className="rounded-full! text-card-foreground! bg-card! border-2! border-border!"
        >
        <SwapHorizIcon />
      </IconButton>

      {/* To Field */}

      <Autocomplete
        fullWidth
        forcePopupIcon={false}
        options={airportOptions}
        value={to}
        onChange={(_, newValue) => setTo(newValue)}
        getOptionLabel={option => option.label}
        renderInput={params => <TextField {...params} label="To" />}
      />
    </Box>
  );
}
