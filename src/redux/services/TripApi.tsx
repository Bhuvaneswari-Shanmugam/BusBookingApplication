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
    },
  }),
  endpoints: (builder) => ({
    searchTrips: builder.mutation({
      query: ({ pickupPoint, destinationPoint, pickupTime }) => ({
        url: 'search-trip',
        method: 'GET',
        params: { pickupPoint, destinationPoint, pickupTime },
      }),
    }),
    createTrip: builder.mutation({
      query: ({ tripNumber, pickupPoint, destinationPoint, pickupTime, reachingTime, expense }) => ({
        url: 'create',
        method: 'POST',
        body: { tripNumber, pickupPoint, destinationPoint, pickupTime, reachingTime, expense },
      }),
    }),
    fetchTrips: builder.query({
      query: ({ page = 0, size = 10 }) => ({
        url: 'retrieve-all-trips',
        method: 'GET',
        params: { page, size },
      }),
    }),
    updateTrip: builder.mutation({
      query: ({ id, tripNumber, pickupPoint, destinationPoint, pickupTime, reachingTime, expense }) => ({
        url: `update-trip/${id}`,
        method: 'PUT',
        body: { tripNumber, pickupPoint, destinationPoint, pickupTime, reachingTime, expense },
      }),
    }),
    deleteTrip: builder.mutation({
      query: (id) => ({
        url: `remove-trip/${id}`,
        method: 'DELETE',
      }),
    }),
    retrieveTripById: builder.query({
      query: (id) => ({
        url: `retrieve-trip/${id}`,
        method: 'GET',
      }),
    }),
    fetchPickUpPoints: builder.query({
      query: ({ pickupPoint, destinationPoint, pickupTime }) => ({
        url: 'pick-up-points',
        method: 'GET',
        params: { pickupPoint, destinationPoint, pickupTime },
      }),
    }),
    fetchDroppingPoints: builder.query({
      query: ({ pickupPoint, destinationPoint, pickupTime }) => ({
        url: 'dropping-points',
        method: 'GET',
        params: { pickupPoint, destinationPoint, pickupTime },
      }),
    }),
  
    getBusesForTrip: builder.query({
      query: ({ pickupPoint, destinationPoint, pickupTime, busType, timeSlot }) => ({
        url: 'buses',
        method: 'GET',
        params: {
          pickupPoint,
          destinationPoint,
          pickupTime,
          busType: busType ,
          timeSlot: timeSlot ,  
        },
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
