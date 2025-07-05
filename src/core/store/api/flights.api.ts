import {CONFIG} from '@/core/config';
import type {
  IFlightDetailQueryResponse,
  IFlightLeg,
} from '@/core/interfaces/flightDetailApi.interface';
import type {
  INearbyAirportQueryResponse,
  ISearchAirportQueryResponse,
} from '@/core/interfaces/flightsApi.interface';
import type {IPriceCalendarQueryResponse} from '@/core/interfaces/flightsPriceCalendarApi.interface';
import type {
  ISearchFlightQueryArgs,
  ISearchFlightsQueryResponse,
} from '@/core/interfaces/searchFlightsApi.interface';
import {ApiBaseQuery} from '@/core/utils/baseQuery';
import {constructQueryParams} from '@/core/utils/queryParams';
import {createApi} from '@reduxjs/toolkit/query/react';

export const flightsApiPaths = {
  nearbyAirports:
    CONFIG.apiBaseUrl + CONFIG.apiVersion + 'flights/getNearByAirports',
  searchAirports:
    CONFIG.apiBaseUrl + CONFIG.apiVersion + 'flights/searchAirport',
  searchFlights: CONFIG.apiBaseUrl + '/api/v2/' + 'flights/searchFlights',
  flightDetails:
    CONFIG.apiBaseUrl + CONFIG.apiVersion + 'flights/getFlightDetails',
  priceCalendar:
    CONFIG.apiBaseUrl + CONFIG.apiVersion + 'flights/getPriceCalendar',
};

export const flightsApi = createApi({
  reducerPath: 'flightsApi',
  baseQuery: ApiBaseQuery,
  tagTypes: [
    'nearbyAirports',
    'searchFlights',
    'flightDetails',
    'priceCalendar',
    'searchAirport',
    'searchMultistopFlights',
  ],
  keepUnusedDataFor: 120,

  endpoints: builder => ({
    nearbyAirports: builder.query<
      INearbyAirportQueryResponse,
      {lat: number; lng: number}
    >({
      providesTags(_result, _error, arg) {
        return [{type: 'nearbyAirports', id: arg.lat + arg.lng}];
      },
      query: arg => {
        const locale = 'en-US';
        return {
          url:
            flightsApiPaths.nearbyAirports +
            constructQueryParams({
              locale,
              lat: arg.lat,
              lng: arg.lng,
            }),
          method: 'GET',
        };
      },
    }),
    searchAirport: builder.query<ISearchAirportQueryResponse, {q: string}>({
      query: arg => {
        return {
          url:
            flightsApiPaths.searchAirports +
            constructQueryParams({
              locale: CONFIG.locale,
              query: arg.q,
            }),
          method: 'GET',
        };
      },
    }),
    flightDetails: builder.query<
      IFlightDetailQueryResponse,
      {
        itineraryId: string;
        sessionId: string;
        legs: IFlightLeg;
        adult?: number;
        children?: number;
        infants?: number;
        currency?: string;
        market?: string;
        countryCode?: string;
      }
    >({
      query: args => {
        return {
          url:
            flightsApiPaths.flightDetails +
            constructQueryParams({
              ...args,
              locale: CONFIG.locale,
            }),
          method: 'GET',
        };
      },
    }),
    flightsPriceCalendar: builder.query<
      IPriceCalendarQueryResponse,
      {
        originSkyId: string;
        destinationSkyId: string;
        fromDate: string;
        toDate?: string;
        currency?: string;
      }
    >({
      query: args => {
        return {
          url:
            flightsApiPaths.priceCalendar +
            constructQueryParams({
              ...args,
            }),
          method: 'GET',
        };
      },
    }),
    searchFlights: builder.query<
      ISearchFlightsQueryResponse,
      ISearchFlightQueryArgs
    >({
      query: args => {
        return {
          url:
            flightsApiPaths.searchFlights +
            constructQueryParams({
              ...args,
            }),
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useNearbyAirportsQuery,
  useLazyNearbyAirportsQuery,
  useSearchAirportQuery,
  useLazySearchAirportQuery,
  useSearchFlightsQuery,
  useLazySearchFlightsQuery,
  useFlightDetailsQuery,
  useLazyFlightDetailsQuery,
  useFlightsPriceCalendarQuery,
  useLazyFlightsPriceCalendarQuery,
} = flightsApi;
