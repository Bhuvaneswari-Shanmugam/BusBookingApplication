import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BusApi = createApi({
    reducerPath: 'busApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BOOKING_URL }), 
    endpoints: (builder) => ({
        getAvailableBuses: builder.query({
            query: ({ pickupPoint, destinationPoint, pickupTime, type }) => ({
                url: `find-buses?busType=${type}&pickupPoint=${pickupPoint}&droppingPoint=${destinationPoint}&pickupTime=${pickupTime}`,
                method: 'GET',
            }),
        }),

        createBus: builder.mutation({
            query: ({ number, tripNumber, type, capacity }) => ({
                url: 'create-bus',
                method: 'POST',
                body: { number, tripNumber, type, capacity },
            }),
        }),

        getAllBusDetails: builder.query({
            query: ({ page = 0, size = 10 }) => ({
                url: `retrieve-all-bus?page=${page}&size=${size}`,
                method: 'GET',
            }),
        }),

        updateBus: builder.mutation({
            query: ({ id, busData }) => ({
                url: `update-bus/${id}`,
                method: 'PUT',
                body: busData,
            }),
        }),
    }),
});

export const {
    useGetAvailableBusesQuery,  
    useCreateBusMutation,
    useGetAllBusDetailsQuery,
    useUpdateBusMutation,
} = BusApi;
