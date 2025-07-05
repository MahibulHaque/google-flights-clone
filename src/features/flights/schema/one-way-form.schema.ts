import * as z from 'zod/v4';
import {airportSchema} from './flight-search-form.schema';

export const oneWayFlightSearchFormSchema = z.object({
  airport: z.object({
    originAirport: airportSchema.nullable(),
    destinationAirport: airportSchema.nullable(),
  }),
  date: z.date(),
});

export type TypeOneWayFlightSearchFormFields = z.infer<
  typeof oneWayFlightSearchFormSchema
>;
