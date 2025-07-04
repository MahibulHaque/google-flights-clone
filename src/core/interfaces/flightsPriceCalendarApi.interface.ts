export interface IPriceCalendarQueryResponse {
  status: boolean;
  timestamp: number;
  data: IPriceCalendarData;
}

export interface IPriceCalendarData {
  flights: IFlightsPricings;
}

export interface IFlightsPricings {
  noPriceLabel: string;
  groups: IFlightGroup[];
  days: IFlightDay[];
  currency: string;
}

export interface IFlightGroup {
  id: string;
  label: string;
}

export interface IFlightDay {
  day: string;
  group: string;
  price: number;
}
