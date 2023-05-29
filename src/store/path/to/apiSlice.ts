import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, provider, HEADERS } from '../../../config/index.json';

const useApi = createApi({
  reducerPath: 'catalog',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    headers: HEADERS
  }),
  endpoints: (builder) => ({
    getCatalog: builder.query<Catalog, void>({ 
      query: () => {
        console.log('Realizando consulta ao catálogo...');
        return `/catalog/${provider}`;
      }
    }),
    getSensor: builder.query<SensorData[], string>({
      query: (sensor) => `/data/${provider}/${sensor}?offset=0&limit=24`
    })
  })
});

export default useApi;
