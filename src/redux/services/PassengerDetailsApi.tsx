import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PassengerDetailsApi = createApi({
  reducerPath: "passengerDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8082/passenger-details",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("Token"); 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPassengerDetails: builder.mutation({
      query: ({ passengers, email, phoneNumber }) => ({
        url: '/create',
        method: 'POST',
        body: passengers, 
        params: { 
          email,
          phoneNumber,
        },
      }),
    }),
  }),
});

export const { useCreatePassengerDetailsMutation } = PassengerDetailsApi;
