import {DatePicker} from '@/components/ui/date-picker';
import {store} from '@/core/store';
import {useLazySearchFlightsQuery} from '@/core/store/api';
import {zodResolver} from '@hookform/resolvers/zod';
import {format} from 'date-fns/format';
import {useImperativeHandle, type RefObject} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  oneWayFlightSearchFormSchema,
  type TypeOneWayFlightSearchFormFields,
} from '../schema/one-way-form.schema';
import AirportSearch from './AirportSearch';

export interface IOnewayFlightSearchFormRef {
  submit: () => Promise<void>;
}

interface IOnewayFlightSearchFormProps {
  ref: RefObject<IOnewayFlightSearchFormRef | null>;
}

export const OneWayFlightSearchForm = ({ref}: IOnewayFlightSearchFormProps) => {
  const [searchFlightsQuery] = useLazySearchFlightsQuery();
  const {control, handleSubmit} = useForm<TypeOneWayFlightSearchFormFields>({
    resolver: zodResolver(oneWayFlightSearchFormSchema),
    defaultValues: {
      date: new Date(),
      airport: {
        originAirport: null,
        destinationAirport: null,
      },
    },
  });

  const onSubmit = async (data: TypeOneWayFlightSearchFormFields) => {
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
        date: format(data.date, 'yyyy-MM-dd'),
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
        name="date"
        control={control}
        render={({field}) => (
          <DatePicker value={field.value} onChange={field.onChange} />
        )}
      />
    </form>
  );
};
