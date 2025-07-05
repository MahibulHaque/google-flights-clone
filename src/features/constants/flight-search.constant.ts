import type { ISelectOption } from "@/components/ui/select";
import  { EnumFlightCabinClass } from "@/core/enums/flights.enum";
import  { EnumFlightTripType } from "../enums/flight-search.enum";


export const FLIGHT_TRIP_TYPES: ISelectOption[] = [
  {
    title: 'Round Trip',
    value: EnumFlightTripType.ROUND_TRIP,
  },
  {
    title: 'One Way',
    value: EnumFlightTripType.ONE_WAY,
  },
  {
    title: 'Multi-city',
    value: EnumFlightTripType.MULTI_STOP,
  },
];

export const FLIGHT_CABIN_CLASSES: ISelectOption[] = [
  {
    title: 'Economy',
    value: EnumFlightCabinClass.ECONOMY,
  },
  {
    title: 'Premium economy',
    value: EnumFlightCabinClass.PREMIUM_ECONOMY,
  },
  {
    title: 'Business',
    value: EnumFlightCabinClass.BUSINESS,
  },
  {
    title: 'First',
    value: EnumFlightCabinClass.FIRST,
  },
];
