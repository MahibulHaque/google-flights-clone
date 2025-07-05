import {DatePicker} from '@/components/ui/date-picker';
import {store, useAppDispatch} from '@/core/store';
import {useLazySearchFlightsMultistopQuery} from '@/core/store/api';
import {zodResolver} from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {Box, Button, IconButton, Typography} from '@mui/material';
import {format} from 'date-fns';
import {useImperativeHandle} from 'react';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {
  multiWayFlightSearchFormSchema,
  type TypeFlightSegment,
  type TypeMultiWayFlightSearchFormFields,
} from '../schema/multi-way-form.schema';
import AirportSearch from './AirportSearch';
import { updateFlightData } from '@/core/store/slices/flight.slice';

export interface IMultiWayFlightSearchFormRef {
  submit: () => Promise<void>;
}

interface IMultiWayFlightSearchFormProps {
  ref?: React.RefObject<IMultiWayFlightSearchFormRef | null>;
}

export const MultiWayFlightSearchForm = ({
  ref,
}: IMultiWayFlightSearchFormProps) => {
  const dispatch = useAppDispatch();
  const [searchFlightsMultistopQuery] = useLazySearchFlightsMultistopQuery();
  const {control, handleSubmit} = useForm<TypeMultiWayFlightSearchFormFields>({
    resolver: zodResolver(multiWayFlightSearchFormSchema),
    defaultValues: {
      flightSegments: [
        {
          date: new Date(),
          airport: {
            originAirport: null,
            destinationAirport: null,
          },
        },
      ],
    },
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'flightSegments',
  });

  const addFlightSegment = () => {
    const newSegment: TypeFlightSegment = {
      date: new Date(),
      airport: {
        originAirport: null,
        destinationAirport: null,
      },
    };
    append(newSegment);
  };

  const removeFlightSegment = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (data: TypeMultiWayFlightSearchFormFields) => {
    try {
      const flightSearchOption =
        store.getState().local.flight.flightSearchOption;

      const segments = data.flightSegments.filter(
        segment =>
          Boolean(segment.airport.originAirport) &&
          Boolean(segment.airport.destinationAirport),
      );
      const legs = segments.map(segment => {
        return {
          origin:
            segment.airport.originAirport?.navigation.relevantFlightParams
              .skyId,
          originEntityId: segment.airport.originAirport?.navigation.entityId,
          destination:
            segment.airport.destinationAirport?.navigation.relevantFlightParams
              .skyId,
          destinationEntityId:
            segment.airport.destinationAirport?.navigation.entityId,
          date: format(segment.date, 'yyyy-MM-dd'),
        };
      });
      const response = await searchFlightsMultistopQuery({
        legs: JSON.stringify(legs),
        cabinClass: flightSearchOption.cabinClass,
        adults: flightSearchOption.passengers.adults,
        childrens: flightSearchOption.passengers.children,
        infants: flightSearchOption.passengers.infants,
      }).unwrap();

      if(response?.data){
        dispatch(updateFlightData(response.data))
      }
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
    <Box className="space-y-2">
      {fields.map((field, index) => (
        <Box key={field.id} className="relative rounded-lg bg-white">
          <Box className="flex! items-center! justify-between mb-1">
            <Typography variant="subtitle1" component="h3">
              Flight {index + 1}
            </Typography>
            {fields.length > 1 && (
              <IconButton
                onClick={() => removeFlightSegment(index)}
                size="small"
                color="error"
                className="">
                <CloseIcon />
              </IconButton>
            )}
          </Box>

          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Controller
              name={`flightSegments.${index}.airport`}
              control={control}
              render={({field: airportField}) => (
                <AirportSearch
                  value={airportField.value}
                  onChange={airportField.onChange}
                />
              )}
            />

            <Controller
              name={`flightSegments.${index}.date`}
              control={control}
              render={({field: dateField}) => (
                <DatePicker
                  value={dateField.value}
                  onChange={dateField.onChange}
                />
              )}
            />
          </Box>
        </Box>
      ))}

      <Box className="flex justify-center">
        <Button
          onClick={addFlightSegment}
          variant="outlined"
          startIcon={<AddIcon />}
          className="mt-4">
          Add Flight
        </Button>
      </Box>
    </Box>
  );
};
