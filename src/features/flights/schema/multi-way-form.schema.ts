import * as z from 'zod/v4';
import {airportSchema} from './flight-search-form.schema';

// Schema for a single flight segment (one-way flight)
export const flightSegmentSchema = z.object({
  airport: z.object({
    originAirport: airportSchema.nullable(),
    destinationAirport: airportSchema.nullable(),
  }),
  date: z.date(),
});

// Schema for multi-way flight search form
export const multiWayFlightSearchFormSchema = z.object({
  flightSegments: z
    .array(flightSegmentSchema)
    .min(1, 'At least one flight segment is required'),
});

export type TypeFlightSegment = z.infer<typeof flightSegmentSchema>;
export type TypeMultiWayFlightSearchFormFields = z.infer<
  typeof multiWayFlightSearchFormSchema
>;
