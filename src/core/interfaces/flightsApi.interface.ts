export interface IAirport {
  presentation: IAirportPresentation;
  navigation: IAirportNavigation;
}

export interface IAirportPresentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

export interface IAirportNavigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: IRelevantFlightParams;
  relevantHotelParams: IRelevantHotelParams;
}

export interface IRelevantFlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

export interface IRelevantHotelParams {
  entityId: string;
  entityType: string;
  localizedName: string;
}
export interface INearbyAirportResponse {
  current: IAirport;
  nearby: IAirport[];
  recent: IAirport[];
}

export interface INearbyAirportQueryResponse {
  status: boolean;
  timestamp: number;
  data: INearbyAirportResponse;
}

export interface ISearchAirportQueryResponse {
  status: boolean;
  timestamp: number;
  data: IAirport[];
}
