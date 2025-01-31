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
    createBooking: builder.mutation<CreateBookingResponse,  { bookingDetails: CreateBookingRequest; token?: string }>({
        query: ({bookingDetails,token}) => ({
          url: '/create',
          method: 'POST',
          body:bookingDetails, 
          headers: {
            Authorization: `Bearer ${token}`, // Explicitly pass the token
          }, 
        }),
      }),
  }),
});

export const { useCreateBookingMutation } = BookingApi;
