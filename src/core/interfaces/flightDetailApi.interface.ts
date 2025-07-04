export interface IFlightDetailQueryResponse {
  status: boolean;
  timestamp: number;
  data: IFlightDetail;
}

export interface IFlightDetail {
  itinerary: IFlightItinerary;
  pollingCompleted: boolean;
}

export interface IFlightItinerary {
  legs: IFlightLeg[];
  pricingOptions: IFlightPricingOption[];
  isTransferRequired: boolean;
  destinationImage: string;
  operatingCarrierSafetyAttributes: IOperatingCarrierSafetyAttribute[];
  flexibleTicketPolicies: unknown[];
}

export interface IFlightLeg {
  id: string;
  origin: IFlightOrigin;
  destination: IFlightDestination;
  segments: Segment[];
  duration: number;
  stopCount: number;
  departure: string;
  arrival: string;
  dayChange: number;
}

export interface IFlightOrigin {
  id: string;
  name: string;
  displayCode: string;
  city: string;
}

export interface IFlightDestination {
  id: string;
  name: string;
  displayCode: string;
  city: string;
}

export interface Segment {
  id: string;
  origin: IFlightSecondOrigin;
  destination: IFlightSecondDestination;
  duration: number;
  dayChange: number;
  flightNumber: string;
  departure: string;
  arrival: string;
  marketingCarrier: IFlightMarketingCarrier;
  operatingCarrier: IFlightOperatingCarrier;
}

export interface IFlightSecondOrigin {
  id: string;
  name: string;
  displayCode: string;
  city: string;
}

export interface IFlightSecondDestination {
  id: string;
  name: string;
  displayCode: string;
  city: string;
}

export interface IFlightMarketingCarrier {
  id: string;
  name: string;
  displayCode: string;
  displayCodeType: string;
  logo: string;
  altId: string;
}

export interface IFlightOperatingCarrier {
  id: string;
  name: string;
  displayCode: string;
  displayCodeType: string;
  logo: string;
  altId: string;
}

export interface IFlightPricingOption {
  agents: Agent[];
  totalPrice: number;
}

export interface Agent {
  id: string;
  name: string;
  isCarrier: boolean;
  bookingProposition: string;
  url: string;
  price: number;
  rating: Rating;
  updateStatus: string;
  segments: Segment2[];
  isDirectDBookUrl: boolean;
  quoteAge: number;
}

export interface Rating {
  value: number;
  count: number;
}

export interface Segment2 {
  id: string;
  origin: Origin3;
  destination: Destination3;
  duration: number;
  dayChange: number;
  flightNumber: string;
  departure: string;
  arrival: string;
  marketingCarrier: MarketingCarrier2;
  operatingCarrier: OperatingCarrier2;
}

export interface Origin3 {
  id: string;
  name: string;
  displayCode: string;
  city: string;
}

export interface Destination3 {
  id: string;
  name: string;
  displayCode: string;
  city: string;
}

export interface MarketingCarrier2 {
  id: string;
  name: string;
  displayCode: string;
  displayCodeType: string;
  logo: string;
  altId: string;
}

export interface OperatingCarrier2 {
  id: string;
  name: string;
  displayCode: string;
  displayCodeType: string;
  logo: string;
  altId: string;
}

export interface IOperatingCarrierSafetyAttribute {
  carrierID: string;
  carrierName: string;
  faceMasksCompulsory: unknown;
  aircraftDeepCleanedDaily: unknown;
  attendantsWearPPE: unknown;
  cleaningPacksProvided: unknown;
  foodServiceChanges: unknown;
  safetyUrl: unknown;
}
