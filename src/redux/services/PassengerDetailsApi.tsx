import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PassengerDetailsApi = createApi({
  reducerPath: "passengerDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8082/passenger",
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
      query: ({ passengers, email, phoneNumber ,busNumber,ticketId}) => ({
        url: '/create',
        method: 'POST',
        body: { 
          passengers,  
          email,      
          phoneNumber, 
          busNumber,
          ticketId,
        },
      }),
    }),
    retrieveGenderList: builder.query({
      query: (busNumber) => ({
        url: `/retrieve/gender/seat-list?busNumber=${busNumber}`, 
        method: "GET",
      }),
    }),
    
  }),
});

export const { useCreatePassengerDetailsMutation, useRetrieveGenderListQuery } = PassengerDetailsApi;
