import CustomSelect from '@/components/ui/select';
import {EnumFlightCabinClass} from '@/core/enums/flights.enum';
import {useAppDispatch, useAppSelector} from '@/core/store';
import {
  changeCabinClass,
  changePassengers,
  changeTripType,
  selectFlightCabinClass,
  selectFlightPassengers,
  selectFlightTripType,
} from '@/core/store/slices/flight.slice';
import {
  FLIGHT_CABIN_CLASSES,
  FLIGHT_TRIP_TYPES,
} from '@/features/constants/flight-search.constant';
import {EnumFlightTripType} from '@/features/enums/flight-search.enum';
import {Search} from '@mui/icons-material';
import Button from '@mui/material/Button';
import {useRef} from 'react';
import type {IPassengers} from '../interfaces/passengers.interface';
import {
  type IMultiWayFlightSearchFormRef,
  MultiWayFlightSearchForm,
} from './MultiWayFlightSearchForm';
import {
  OneWayFlightSearchForm,
  type IOnewayFlightSearchFormRef,
} from './OneWayFlightSearchForm';
import PassengerCountDropdown from './PassengerCountDropdown';
import type {IRoundTripFlightSearchFormRef} from './RoundTripFlightSearchForm';
import RoundTripFlightSearchForm from './RoundTripFlightSearchForm';

export const FlightSearchCard = () => {
  const onewayFlightSearchFormRef = useRef<IOnewayFlightSearchFormRef | null>(
    null,
  );
  const roundTripFlightSearchFormRef =
    useRef<IRoundTripFlightSearchFormRef | null>(null);
  const multiwayFlightSearchFormRef =
    useRef<IMultiWayFlightSearchFormRef | null>(null);
  const dispatch = useAppDispatch();
  const tripType = useAppSelector(selectFlightTripType);
  const cabinClass = useAppSelector(selectFlightCabinClass);
  const passengers = useAppSelector(selectFlightPassengers);

  const handleTripTypeChange = (value: EnumFlightTripType) => {
    dispatch(changeTripType(value));
  };

  const handleCabinClassChange = (value: EnumFlightCabinClass) => {
    dispatch(changeCabinClass(value));
  };

  const handlePassengerChange = (value: IPassengers) => {
    dispatch(changePassengers(value));
  };

  const handleFlightSearchFormSubmit = async () => {
    try {
      if (tripType === EnumFlightTripType.ONE_WAY) {
        await onewayFlightSearchFormRef.current?.submit();
      } else if (tripType === EnumFlightTripType.ROUND_TRIP) {
        await roundTripFlightSearchFormRef.current?.submit();
      }
      else if(tripType === EnumFlightTripType.MULTI_STOP){
        await multiwayFlightSearchFormRef.current?.submit();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container flex flex-col bg-card py-2 px-4 rounded-md shadow-md gap-2 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[100%] lg:max-w-full gap-2">
        <CustomSelect
          name="tripType"
          label="Trip type"
          value={tripType}
          options={FLIGHT_TRIP_TYPES}
          onChange={e => {
            handleTripTypeChange(e.target.value as EnumFlightTripType);
          }}
        />

        <PassengerCountDropdown
          value={passengers}
          onChange={handlePassengerChange}
        />
        <CustomSelect
          name="cabinType"
          label="Cabin class"
          value={cabinClass}
          options={FLIGHT_CABIN_CLASSES}
          onChange={e => {
            handleCabinClassChange(e.target.value as EnumFlightCabinClass);
          }}
        />
      </div>
      {tripType === EnumFlightTripType.ONE_WAY && (
        <OneWayFlightSearchForm ref={onewayFlightSearchFormRef} />
      )}
      {tripType === EnumFlightTripType.ROUND_TRIP && (
        <RoundTripFlightSearchForm ref={roundTripFlightSearchFormRef} />
      )}
      {tripType === EnumFlightTripType.MULTI_STOP && (
        <MultiWayFlightSearchForm ref={multiwayFlightSearchFormRef} />
      )}
      <Button
        size="large"
        variant="contained"
        color={'primary'}
        onClick={handleFlightSearchFormSubmit}
        startIcon={<Search />}
        className="absolute bottom-[-30px] rounded-full! max-w-fit left-[50%] translate-x-[-50%]">
        Search Flights
      </Button>
    </div>
  );
};
