
import {Search} from '@mui/icons-material';
import Button from '@mui/material/Button';
import AirportSearch from './AirportSearch';
import PassengerCountDropdown from './PassengerCountDropdown';
import CustomSelect from '@/components/ui/select';
import { EnumFlightCabinClass } from '@/core/enums/flights.enum';
import { FLIGHT_TRIP_TYPES, FLIGHT_CABIN_CLASSES } from '@/features/constants/flight-search.constant';
import { EnumFlightTripType } from '@/features/enums/flight-search.enum';

export const FlightSearchForm = () => {

  return (
    <div className="container flex flex-col bg-card py-2 pb-1 px-4 rounded-md shadow-md gap-2 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[100%] lg:max-w-full gap-2">
        <CustomSelect
          name="tripType"
          label="Trip type"
          defaultValue={EnumFlightTripType.ROUND_TRIP}
          options={FLIGHT_TRIP_TYPES}
        />

        <PassengerCountDropdown />
        <CustomSelect
          name="cabinType"
          label="Cabin class"
          defaultValue={EnumFlightCabinClass.ECONOMY}
          options={FLIGHT_CABIN_CLASSES}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <AirportSearch />
        
      </div>
      <Button size='large' variant="contained" color={'primary'} startIcon={<Search />} className='absolute bottom-[-30px] rounded-full! max-w-fit left-[50%] translate-x-[-50%]'>
        Search Flights
      </Button>
    </div>
  );
};
