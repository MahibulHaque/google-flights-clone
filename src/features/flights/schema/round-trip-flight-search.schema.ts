import * as z from 'zod/v4';
import {airportSchema} from './flight-search-form.schema';

export const roundTripFlightSearchSchema = z.object({
  airport: z.object({
    originAirport: airportSchema.nullable(),
    destinationAirport: airportSchema.nullable(),
  }),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine(
      data => {
        if (data.from && data.to) {
          return data.from <= data.to;
        }
        return true;
      },
      {
        message: 'Start date must be before or equal to end date',
        path: ['to'],
      },
    ),
});

export type TypeRoundTripFlightSearchFormFields = z.infer<
  typeof roundTripFlightSearchSchema
>;
