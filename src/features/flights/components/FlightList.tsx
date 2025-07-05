import {useAppSelector} from '@/core/store';
import {
  selectFlightCabinClass,
  selectFlightData,
} from '@/core/store/slices/flight.slice';
import {Coffee, ExpandMore, Flight, Power, Wifi} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
} from '@mui/material';
import {format} from 'date-fns/format';
import {intervalToDuration} from 'date-fns/intervalToDuration';

export const FlightList = () => {
  const data = useAppSelector(selectFlightData);

  const cabinClass = useAppSelector(selectFlightCabinClass);

  const formatTimestamp = (time: string) => {
    return format(new Date(time), 'hh:mm a');
  };

  const formatTotalDuration = (durationInMinutes: number) => {
    const start = new Date(0);
    const end = new Date(durationInMinutes * 60 * 1000); // convert minutes to milliseconds

    const {hours, minutes} = intervalToDuration({start, end});

    const hoursPart = hours ? `${hours} hr` : '';
    const minutesPart = minutes ? `${minutes} min` : '';

    return [hoursPart, minutesPart].filter(Boolean).join(' ');
  };

  const flightAmenities = ['Wi-Fi', 'Entertainment', 'Meals'] as const;
  const amenityIcons = {
    'Wi-Fi': Wifi,
    'Power outlets': Power,
    Snacks: Coffee,
    'Premium snacks': Coffee,
    Entertainment: Coffee,
    Meals: Coffee,
  };

  return (
    <div className="mb-10">
      {data?.itineraries.map(flight => (
        <Accordion key={flight.id}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <div className="flex items-center justify-between w-full! px-4">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                {/* Airline and flight number */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <img
                      className="w-auto h-4"
                      src={flight.legs[0].carriers.marketing[0].logoUrl}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {flight.legs[0].carriers.marketing[0].name}
                    </div>
                  </div>
                </div>

                {/* Flight times and route */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="font-semibold text-lg">
                        {formatTimestamp(flight.legs[0].departure)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {flight.legs[0].origin.displayCode}
                      </div>
                    </div>

                    <div className="flex-1 mx-4 relative">
                      <div className="border-t border-muted-foreground/30 relative">
                        <Flight className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground rotate-90" />
                      </div>
                      <div className="text-center mt-1">
                        <div className="text-xs text-muted-foreground">
                          {formatTotalDuration(
                            flight.legs[0].durationInMinutes,
                          )}
                        </div>
                        {flight.legs[0].stopCount > 0 && (
                          <div className="text-xs text-muted-foreground">
                            {flight.legs[0].stopCount} stop
                            {flight.legs[0].stopCount > 1 ? 's' : ''}
                          </div>
                        )}
                        {flight.legs[0].stopCount === 0 && (
                          <div className="text-xs text-primary">Nonstop</div>
                        )}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-lg">
                        {formatTimestamp(flight.legs[0].arrival)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {flight.legs[0].destination.displayCode}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price and select */}
                <div className="flex items-center justify-between md:justify-end gap-4">
                  <div className="text-right">
                    <div className="font-semibold text-xl">
                      {flight.price.formatted}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per person
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="border-t bg-muted/20 p-6 space-y-6">
              {/* Flight Route Timeline */}
              <div>
                <h4 className="font-semibold mb-4 text-lg">Flight Details</h4>
                <div className="space-y-4">
                  {flight.legs[0].segments.map(segment => (
                    <div key={segment.id} className="relative">
                      {/* Flight Segment */}
                      <div className="bg-card rounded-lg border p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 flex items-center justify-center">
                              <img
                                className="w-3 h-3"
                                src={
                                  flight.legs[0].carriers.marketing[0].logoUrl
                                }
                                alt="carrier"
                              />
                            </div>
                            <span className="font-medium text-sm">
                              {segment.flightNumber}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              •
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {segment.marketingCarrier.name}
                            </span>
                          </div>
                          <Badge className="text-xs">
                            {formatTotalDuration(segment.durationInMinutes)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          {/* Departure */}
                          <div className="text-center md:text-left">
                            <div className="font-semibold text-lg">
                              {formatTimestamp(segment.departure)}
                            </div>
                            <div className="font-medium">
                              {segment.origin.displayCode}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {segment.origin.name}
                            </div>
                          </div>

                          {/* Flight Path */}
                          <div className="flex items-center justify-center">
                            <div className="flex-1 border-t-2 border-dashed border-primary/30 relative">
                              <Flight className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary rotate-90 bg-card" />
                            </div>
                          </div>

                          {/* Arrival */}
                          <div className="text-center md:text-right">
                            <div className="font-semibold text-lg">
                              {formatTimestamp(segment.arrival)}
                            </div>
                            <div className="font-medium">
                              {segment.destination.displayCode}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {segment.destination.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
                {/* Amenities */}
                <div>
                  <h4 className="font-medium mb-3">Amenities</h4>
                  <div className="space-y-2">
                    {flightAmenities.map(amenity => {
                      const IconComponent =
                        amenityIcons[amenity as keyof typeof amenityIcons] ||
                        Coffee;
                      return (
                        <div
                          key={amenity}
                          className="flex items-center gap-2 text-sm">
                          <IconComponent className="w-4 h-4 text-primary" />
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Baggage */}
                <div>
                  <h4 className="font-medium mb-3">Baggage</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                      <span>1 carry-on bag</span>
                    </div>
                  </div>
                </div>

                {/* Trip Summary */}
                <div>
                  <h4 className="font-medium mb-3">Trip Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total duration:
                      </span>
                      <span className="font-medium">
                        {formatTotalDuration(flight.legs[0].durationInMinutes)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seat type:</span>
                      <span className="font-medium uppercase">
                        {cabinClass}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
