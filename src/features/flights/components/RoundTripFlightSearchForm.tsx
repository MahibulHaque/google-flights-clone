import DateRangePicker from '@/components/ui/date-range-picker';
import {store} from '@/core/store';
import {useLazySearchFlightsQuery} from '@/core/store/api';
import {zodResolver} from '@hookform/resolvers/zod';
import {format} from 'date-fns/format';
import {useImperativeHandle, type RefObject} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  roundTripFlightSearchSchema,
  type TypeRoundTripFlightSearchFormFields,
} from '../schema/round-trip-flight-search.schema';
import AirportSearch from './AirportSearch';

export interface IRoundTripFlightSearchFormRef {
  submit: () => Promise<void>;
}

export interface IRoundTripFlightSearchFormProps {
  ref: RefObject<IRoundTripFlightSearchFormRef | null>;
}

export default function RoundTripFlightSearchForm({
  ref,
}: IRoundTripFlightSearchFormProps) {
  const [searchFlightsQuery] = useLazySearchFlightsQuery();

  const {control, handleSubmit} = useForm<TypeRoundTripFlightSearchFormFields>({
    resolver: zodResolver(roundTripFlightSearchSchema),
    defaultValues: {
      airport: {
        originAirport: null,
        destinationAirport: null,
      },
      dateRange: {
        from: new Date(),
        to: (() => {
          const date = new Date();
          date.setDate(date.getDate() + 7);
          return date;
        })(),
      },
    },
  });

  const onSubmit = async (data: TypeRoundTripFlightSearchFormFields) => {
    try {
      if (!data.airport.originAirport || !data.airport.destinationAirport) {
        return;
      }
      const flightSearchOptions =
        store.getState().local.flight.flightSearchOption;

      const {skyId, entityId} =
        data.airport.originAirport.navigation.relevantFlightParams;
      const {skyId: destinationSkyId, entityId: destinationEntityId} =
        data.airport.destinationAirport.navigation.relevantFlightParams;

      const response = await searchFlightsQuery({
        originSkyId: skyId,
        originEntityId: entityId,
        destinationSkyId: destinationSkyId,
        destinationEntityId: destinationEntityId,
        date: format(data.dateRange.from, 'yyyy-MM-dd'),
        returnDate: format(data.dateRange.to, 'yyyy-MM-dd'),
        cabinClass: flightSearchOptions.cabinClass,
        adults: flightSearchOptions.passengers.adults,
        childrens: flightSearchOptions.passengers.children,
        infants: flightSearchOptions.passengers.infants,
      }).unwrap();

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      submit: handleSubmit(onSubmit),
    };
  });
  return (
    <form className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <Controller
        name="airport"
        control={control}
        render={({field}) => (
          <AirportSearch value={field.value} onChange={field.onChange} />
        )}
      />
      <Controller
        name="dateRange"
        control={control}
        render={({field}) => (
          <DateRangePicker value={field.value} onChange={field.onChange} />
        )}
      />
    </form>
  );
}
