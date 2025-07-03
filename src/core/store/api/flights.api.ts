import {CONFIG} from '@core/config';
import type {
  INearbyAirportQueryResponse,
  ISearchAirportQueryResponse,
} from '@core/interfaces/flightsApi.interface';
import {ApiBaseQuery} from '@core/utils/baseQuery';
import {constructQueryParams} from '@core/utils/queryParams';
import {createApi} from '@reduxjs/toolkit/query/react';

export const flightsApiPaths = {
  nearbyAirports:
    CONFIG.apiBaseUrl + CONFIG.apiVersion + 'flights/getNearByAirports',
  searchAirports:
    CONFIG.apiBaseUrl + CONFIG.apiVersion + 'flights/searchAirport',
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
  keepUnusedDataFor: 60,

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
              q: arg.q,
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
} = flightsApi;
