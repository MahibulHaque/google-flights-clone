import {flightsApi} from './flights.api';

// Set up the API reducers dynamically
export const apiReducers = {
  [flightsApi.reducerPath]: flightsApi.reducer,
};

// Dynamically collect all API middlewares
export const apiMiddlewares = [flightsApi.middleware];
