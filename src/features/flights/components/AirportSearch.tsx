import {useDebounceValue} from '@/core/hooks';
import type {IAirport} from '@/core/interfaces/flightsApi.interface';
import {useSearchAirportQuery} from '@/core/store/api';
import FlightIcon from '@mui/icons-material/Flight';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {Autocomplete, Box, IconButton, TextField} from '@mui/material';
export interface IAirportSearchValue {
  originAirport: IAirport | null;
  destinationAirport: IAirport | null;
}

interface IAirportSearchProps {
  value: IAirportSearchValue;
  onChange: (value: IAirportSearchValue) => void;
}

export default function AirportSearch({value, onChange}: IAirportSearchProps) {
  const [originAirportQuery, setOriginAirportQuery] = useDebounceValue<string>(
    '',
    500,
  );
  const [destinationQuery, setDestinationQuery] = useDebounceValue<string>(
    '',
    500,
  );

  const {data: originAirports, isFetching: isFetchingOriginAirports} =
    useSearchAirportQuery(
      {q: originAirportQuery},
      {skip: !originAirportQuery || originAirportQuery.length <= 2},
    );

  const {data: destinationAirports, isFetching: isFetchingDestinationAirports} =
    useSearchAirportQuery(
      {q: destinationQuery},
      {skip: !destinationQuery || destinationQuery.length <= 2},
    );

  const setOriginAirport = (val: IAirport | null) => {
    const destinationAirport = value.destinationAirport;

    onChange({
      originAirport: val,
      destinationAirport,
    });
  };

  const setDestinationAirport = (val: IAirport | null) => {
    const originAirport = value.originAirport;
    onChange({
      originAirport,
      destinationAirport: val,
    });
  };

  const handleSwap = () => {
    const originAirport = value.originAirport;
    const destinationAirport = value.destinationAirport;

    onChange({
      originAirport: destinationAirport,
      destinationAirport: originAirport,
    });
  };

  return (
    <Box
      position="relative"
      width="100%"
      display="flex"
      alignItems="center"
      gap={4}>
      {/* From Field */}
      <Autocomplete
        forcePopupIcon={false}
        fullWidth
        loading={isFetchingOriginAirports}
        options={originAirports?.data ?? []}
        value={value.originAirport}
        onInputChange={(_e, v) => {
          setOriginAirportQuery(v);
        }}
        onChange={(_, newValue) => setOriginAirport(newValue)}
        getOptionLabel={option => {
          if (!option) {
            return option;
          }
          return option.presentation.title;
        }}
        renderOption={({key, ...props}, option: IAirport) => (
          <Box
            component="li"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
            key={key}
            {...props}>
            <FlightIcon />
            <span>{option.presentation.title}</span>
            <span>({option.navigation.relevantFlightParams.skyId})</span>
          </Box>
        )}
        renderInput={params => <TextField {...params} label="From" />}
      />
      <IconButton
        onClick={handleSwap}
        className="rounded-full! outline-1! outline-border! text-card-foreground! bg-border! border-2! border-card! absolute! z-99 top-[50%]! left-[50%]! translate-x-[-50%]! translate-y-[-50%]!">
        <SwapHorizIcon />
      </IconButton>
      <Autocomplete
        fullWidth
        forcePopupIcon={false}
        options={destinationAirports?.data ?? []}
        value={value.destinationAirport}
        loading={isFetchingDestinationAirports}
        onInputChange={(_e, v) => {
          setDestinationQuery(v);
        }}
        onChange={(_, newValue) => setDestinationAirport(newValue)}
        getOptionLabel={option => {
          if (!option) {
            return option;
          }
          return option.presentation.title;
        }}
        renderOption={({key, ...props}, option: IAirport) => (
          <Box
            component="li"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
            key={key}
            {...props}>
            <FlightIcon />
            <span>{option.presentation.title}</span>
            <span>({option.navigation.relevantFlightParams.skyId})</span>
          </Box>
        )}
        renderInput={params => <TextField {...params} label="To" />}
      />
    </Box>
  );
}
