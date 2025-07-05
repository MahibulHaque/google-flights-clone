import {EnumFlightCabinClass} from '@/core/enums/flights.enum';
import {EnumFlightTripType} from '@/features/enums/flight-search.enum';
import * as z from 'zod/v4';

export const relevantFlightParamsSchema = z.object({
  skyId: z.string(),
  entityId: z.string(),
  flightPlaceType: z.string(),
  localizedName: z.string(),
});

// IRelevantHotelParams
export const relevantHotelParamsSchema = z.object({
  entityId: z.string(),
  entityType: z.string(),
  localizedName: z.string(),
});

// IAirportNavigation
export const airportNavigationSchema = z.object({
  entityId: z.string(),
  entityType: z.string(),
  localizedName: z.string(),
  relevantFlightParams: relevantFlightParamsSchema,
  relevantHotelParams: relevantHotelParamsSchema,
});

// IAirportPresentation
export const airportPresentationSchema = z.object({
  title: z.string(),
  suggestionTitle: z.string(),
  subtitle: z.string(),
});

// IAirport
export const airportSchema = z.object({
  presentation: airportPresentationSchema,
  navigation: airportNavigationSchema,
});

export const flightSearchFormSchema = z.object({
  tripType: z.enum(EnumFlightTripType),
  cabinClass: z.enum(EnumFlightCabinClass),
  originAirport: airportSchema,
  destinationAirport: airportSchema,
  passengers: z.object({
    adults: z
      .number()
      .min(1, 'At least 1 adult is required')
      .max(9, 'Maximum 9 adults'),
    children: z
      .number()
      .min(0, 'Children cannot be negative')
      .max(9, 'Maximum 9 children'),
    infants: z
      .number()
      .min(0, 'Infants cannot be negative')
      .max(9, 'Maximum 9 infants'),
  }),
});

export type TypeFlightSearchFormFields = z.infer<typeof flightSearchFormSchema>;
