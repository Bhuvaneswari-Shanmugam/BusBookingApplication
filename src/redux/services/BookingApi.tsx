import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {CreateBookingRequest,CreateBookingResponse} from '../../utils/entity/BookingInterface'

const token = sessionStorage.getItem('Token');
export const BookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8082/booking',
    prepareHeaders: (headers) => {
    
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createBooking: builder.mutation<CreateBookingResponse,CreateBookingRequest>({
        query: (bookingDetails) => ({
          url: '/create',
          method: 'POST',
          body:bookingDetails, 
        }),
      }),
  }),
});

export const { useCreateBookingMutation } = BookingApi;