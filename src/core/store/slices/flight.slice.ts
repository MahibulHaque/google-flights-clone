import {EnumFlightCabinClass} from '@/core/enums/flights.enum';
import type {IFlightData} from '@/core/interfaces/searchFlightsApi.interface';
import {EnumFlightTripType} from '@/features/enums/flight-search.enum';
import type {IPassengers} from '@/features/flights/interfaces/passengers.interface';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '..';

const namespace = 'flight';

export interface IFlightSearchOption {
  tripType: EnumFlightTripType;
  cabinClass: EnumFlightCabinClass;
  passengers: IPassengers;
}

export interface IFlightState {
  flightSearchOption: IFlightSearchOption;
  flightData: IFlightData | null;
}

const initialState: IFlightState = {
  flightSearchOption: {
    tripType: EnumFlightTripType.ONE_WAY,
    cabinClass: EnumFlightCabinClass.ECONOMY,
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
  },
  flightData: null,
};

const appFlightSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    changeTripType: (state, action: PayloadAction<EnumFlightTripType>) => {
      state.flightSearchOption.tripType = action.payload;
    },
    changePassengers: (state, action: PayloadAction<IPassengers>) => {
      state.flightSearchOption.passengers = action.payload;
    },
    changeCabinClass: (state, action: PayloadAction<EnumFlightCabinClass>) => {
      state.flightSearchOption.cabinClass = action.payload;
    },
    updateFlightData: (state, action: PayloadAction<IFlightData>) => {
      state.flightData = action.payload;
    },
  },
});

export const {
  changeTripType,
  changeCabinClass,
  changePassengers,
  updateFlightData,
} = appFlightSlice.actions;

export const selectFlightTripType = (state: RootState) =>
  state.local.flight.flightSearchOption.tripType;
export const selectFlightCabinClass = (state: RootState) =>
  state.local.flight.flightSearchOption.cabinClass;
export const selectFlightPassengers = (state: RootState) =>
  state.local.flight.flightSearchOption.passengers;

export const selectFlightData = (state: RootState) =>
  state.local.flight.flightData;

export default appFlightSlice.reducer;
