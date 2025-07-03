import {CONFIG} from '@core/config';
import {
  type BaseQueryFn,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';

interface IExtraOptions {
  headers?: Record<string, string>;
}

const baseQuery =
  (): BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    IExtraOptions,
    FetchBaseQueryMeta
  > =>
  async (args, api, extraOptions) => {
    const query = fetchBaseQuery({
      baseUrl: CONFIG.apiBaseUrl,
      prepareHeaders: async headers => {
        const hostname = CONFIG.apiHostname;
        const apiKey = CONFIG.apiKey;

        headers.set('x-rapidapi-host', hostname);
        headers.set('x-rapidapi-key', apiKey);

        if (extraOptions && extraOptions['headers']) {
          Object.entries(extraOptions.headers).forEach(([key, value]) => {
            headers.set(key, value as string); // Set custom headers
          });
        }

        return headers;
      },
    });
    const result = await query(args, api, extraOptions);
    return result;
  };

export const ApiBaseQuery = baseQuery();
