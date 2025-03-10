import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateBookingRequest, CreateBookingResponse } from '../../utils/entity/BookingInterface'
import { useDeleteUserMutation } from './UserApi';

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
    createBooking: builder.mutation<CreateBookingResponse, CreateBookingRequest>({
      query: (bookingDetails) => ({
        url: '/create',
        method: 'POST',
        body: bookingDetails,
      }),
    }),
    retrievePastBooking: builder.query<any, void>({
      query: () => ({
        url: '/retrieve/past-booking',
        method: 'GET',
      }),
    }),
    retrieveUpcomingBooking: builder.query<any, void>({
      query: () => ({
        url: '/retrieve/upcoming-booking',
        method: 'GET',
      }),
    }),
    deleteBooking: builder.mutation<void,string>({
      query: (bookingId) => ({
        url: `/cancel?bookingId=${bookingId}`, 
        method: 'DELETE',
      }),
    }),
    retrievebookingByTicketId: builder.query<any, { ticketId: string }>({
      query: ({ ticketId }) => ({
        url: `/retrieve/ticketId?ticketId=${ticketId}`,
        method: 'GET',
      }),
    }),
    cancetTicket: builder.mutation<any, { passengerId: string }>({
      query: ({ passengerId }) => ({
        url: `/cancel-ticket?passengerId=${passengerId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreateBookingMutation, 
               useRetrievePastBookingQuery, 
               useRetrieveUpcomingBookingQuery ,
               useDeleteBookingMutation,
               useRetrievebookingByTicketIdQuery,
               useCancetTicketMutation
              } = BookingApi;