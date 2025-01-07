import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BusApi = createApi({
    reducerPath: 'busApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/bus/' }), 
    endpoints: (builder) => ({
        getAvailableSeatCount: builder.query({
            query: ({ number, type }) => ({
                url: `search-bus?number=${number}&type=${type}`,  
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
    useGetAvailableSeatCountQuery, 
    useCreateBusMutation, 
    useGetAllBusDetailsQuery, 
    useUpdateBusMutation 
} = BusApi;
