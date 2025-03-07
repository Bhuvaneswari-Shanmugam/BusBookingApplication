// src/services/TripApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TripApi = createApi({
  reducerPath: 'tripApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("Token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    searchTrips: builder.mutation({
      query: ({ pickupPoint, destinationPoint, pickupTime }) => ({
        url: 'trip/search-trip',
        method: 'GET',
        params: { pickupPoint, destinationPoint, pickupTime },
      }),
    }),
    createTrip: builder.mutation({
      query: ({ tripNumber, pickupPoint, destinationPoint, pickupTime, reachingTime, expense }) => ({
        url: 'trip/create',
        method: 'POST',
        body: { tripNumber, pickupPoint, destinationPoint, pickupTime, reachingTime, expense },
      }),
    }),
    fetchTrips: builder.query({
      query: ({ page = 0, size = 10 }) => ({
        url: `trip/retrieve-all-trips`,
        method: 'GET',
        params: { page, size },
      }),
    }),
    updateTrip: builder.mutation({
      query: ({ id, tripNumber, pickupPoint, destinationPoint, pickupTime, reachingTime, expense }) => ({
        url: `trip/update/${id}`,
        method: 'PUT',
        body: { tripNumber, pickupPoint, destinationPoint, pickupTime, reachingTime, expense },
      }),
    }),
    deleteTrip: builder.mutation({
      query: (id) => ({
        url: `trip/remove-trip/${id}`,
        method: 'DELETE',
      }),
    }),
    retrieveTripById: builder.query({
      query: (id) => ({
        url: `trip/retrieve-trip/${id}`,
        method: 'GET',
      }),
    }),
    fetchPickUpPoints: builder.query({
      query: ({ pickupPoint, destinationPoint, pickupTime }) => ({
        url: 'trip/pick-up-points',
        method: 'GET',
        params: { pickupPoint, destinationPoint, pickupTime },
      }),
    }),
    fetchDroppingPoints: builder.query({
      query: ({ pickupPoint, destinationPoint, pickupTime }) => ({
        url: 'trip/dropping-points',
        method: 'GET',
        params: { pickupPoint, destinationPoint, pickupTime },
      }),
    }),
    getBusesForTrip: builder.query({
      query: (params) => ({
        url: 'trip/retrieve',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const {
  useSearchTripsMutation,
  useCreateTripMutation,
  useFetchTripsQuery,
  useDeleteTripMutation,
  useUpdateTripMutation,
  useRetrieveTripByIdQuery,
  useFetchPickUpPointsQuery,
  useFetchDroppingPointsQuery,
  useGetBusesForTripQuery,
} = TripApi;
