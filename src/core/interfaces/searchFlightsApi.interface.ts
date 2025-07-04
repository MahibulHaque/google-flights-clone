import type {
  EnumFlightCabinClass,
  EnumFlightsSortBy,
} from '@core/enums/flights.enum';

export interface ISearchFlightQueryArgs {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass?: EnumFlightCabinClass;
  adults?: number;
  childrens?: number;
  infants?: number;
  sortBy?: EnumFlightsSortBy;
  currency?: string;
  market?: string;
  countryCode?: string;
}

export interface ISearchFlightsQueryResponse {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: IFlightData;
}

export interface IFlightData {
  context: Context;
  itineraries: Itinerary[];
  messages: unknown[];
  filterStats: IFlightFilterStats;
}

export interface Context {
  status: string;
  totalResults: number;
}

export interface Itinerary {
  id: string;
  price: IFlightPrice;
  legs: IFlightLeg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: IFlightFarePolicy;
  eco?: IFlightEconomy;
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface IFlightPrice {
  raw: number;
  formatted: string;
}

export interface IFlightLeg {
  id: string;
  origin: Origin;
  destination: Destination;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: Carriers;
  segments: Segment[];
}

export interface Origin {
  id: string;
  name: string;
  displayCode: string;
  city: string;
  isHighlighted: boolean;
}

export interface Destination {
  id: string;
  name: string;
  displayCode: string;
  city: string;
  isHighlighted: boolean;
}

export interface Carriers {
  marketing: Marketing[];
  operationType: string;
}

export interface Marketing {
  id: number;
  logoUrl: string;
  name: string;
}

export interface Segment {
  id: string;
  origin: Origin2;
  destination: Destination2;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: MarketingCarrier;
  operatingCarrier: OperatingCarrier;
}

export interface Origin2 {
  flightPlaceId: string;
  displayCode: string;
  parent: Parent;
  name: string;
  type: string;
}

export interface Parent {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: string;
}

export interface Destination2 {
  flightPlaceId: string;
  displayCode: string;
  parent: Parent2;
  name: string;
  type: string;
}

export interface Parent2 {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: string;
}

export interface MarketingCarrier {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
}

export interface OperatingCarrier {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
}

export interface IFlightFarePolicy {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

export interface IFlightEconomy {
  ecoContenderDelta: number;
}

export interface IFlightFilterStats {
  duration: Duration;
  airports: Airport[];
  carriers: Carrier[];
  stopPrices: StopPrices;
}

export interface Duration {
  min: number;
  max: number;
}

export interface Airport {
  city: string;
  airports: Airport2[];
}

export interface Airport2 {
  id: string;
  name: string;
}

export interface Carrier {
  id: number;
  logoUrl: string;
  name: string;
}

export interface StopPrices {
  direct: Direct;
  one: One;
  twoOrMore: TwoOrMore;
}

export interface Direct {
  isPresent: boolean;
  formattedPrice: string;
}

export interface One {
  isPresent: boolean;
  formattedPrice: string;
}

export interface TwoOrMore {
  isPresent: boolean;
}
