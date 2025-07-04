import {CONFIG} from '@core/config';
import type {IConfigApiQueryResponse} from '@core/interfaces/configApi.interface';
import {ApiBaseQuery} from '@core/utils/baseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const configApiPath =
  CONFIG.apiBaseUrl + CONFIG.apiVersion + 'getConfig';

export const configApi = createApi({
  reducerPath: 'configApi',
  baseQuery: ApiBaseQuery,
  keepUnusedDataFor: 120,
  tagTypes: ['config'],
  endpoints: builder => ({
    config: builder.query<IConfigApiQueryResponse, void>({
      query: () => {
        return {
          url: configApiPath,
          method: 'GET',
        };
      },
      providesTags: () => ['config'],
    }),
  }),
});

export const {useConfigQuery, useLazyConfigQuery} = configApi;
