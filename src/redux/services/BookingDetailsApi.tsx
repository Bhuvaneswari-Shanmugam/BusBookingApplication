import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BookingDetailsApi = createApi({
  reducerPath: 'bookingDetailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:8082/booking/",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('Token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchAllBooking: builder.query({
      query: ({ page=0, size=10 }) => ({
        url: `retrieve`,
        method: 'POST',
        body:{page,size}
      }),
    }),
    
  }),
});

export const { useFetchAllBookingQuery } = BookingDetailsApi;