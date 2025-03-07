import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SeatApi = createApi({
  reducerPath: 'seatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081/seat/',
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('Token'); 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); 
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    createSeat: builder.mutation({
      query: ({  seatNumber ,busNumber}) => ({
        url: 'create-seat',
        params: { seatNumber,busNumber }, 
        method: 'POST',
      }),
    }),
    fetchSeats: builder.query({
      query: ({ page, size }) => ({
        url: `retrieve-all-seats?page=${page}&size=${size}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateSeatMutation, useFetchSeatsQuery } = SeatApi;