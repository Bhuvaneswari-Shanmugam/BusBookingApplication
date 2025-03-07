import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CustomerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:8080/auth/",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('Token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchAllUsers: builder.query({
      query: ({ page = 0, size = 10 }) => ({
        url: 'fetch',
        method: 'POST',
        body: { page, size }, 
      }),
    }),
  }),
});

export const { useFetchAllUsersQuery } = CustomerApi;