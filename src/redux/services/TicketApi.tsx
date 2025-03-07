import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TicketApi = createApi({
  reducerPath: "TicketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8082/ticket",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("Token"); 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: ({ ticketId, ticketUrl}) => ({
        url: `/create?ticketId=${ticketId}&ticketUrl=${encodeURIComponent(ticketUrl)}`,
        method: 'POST',
      }),
    }),
    retrieveBookings: builder.query({
      query: (ticketId) => ({
        url: `/retrieve?ticketId=${ticketId}`, 
        method: "GET",
      }),
    }),
    
  }),
});

export const { useCreateTicketMutation, useRetrieveBookingsQuery } = TicketApi;
