import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const token = sessionStorage.getItem('Token'); 
console.log(token);

export const BusApi = createApi({
  reducerPath: 'busApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081/', 
    prepareHeaders: (headers) => {
        const token = sessionStorage.getItem("Token");
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      }
  }),
 
    endpoints: (builder) => ({
        getAvailableBuses: builder.query({
            query: ({ pickupPoint, destinationPoint, pickupTime, type }) => {
               
                const query = new URLSearchParams({
                    busType: type || '',
                    pickupPoint: pickupPoint || '',
                    droppingPoint: destinationPoint || '',
                    pickupTime: pickupTime || '',
                }).toString();
                
                return {
                    url: `find-buses?${query}`,
                    method: 'GET',
                };
            },
        }),

        createBus: builder.mutation({
            query: ({ number, tripNumber, type,name, capacity,droppingPoint,expense,ratings,pickupPoint,duration,arrivalTime,departureTime}) => ({
                url: 'bus/create',
                method: 'POST',
                body: { number, tripNumber, type, name,capacity,droppingPoint,expense,ratings,pickupPoint,duration,arrivalTime,departureTime },
            }),
        }),
        getAllBusDetails: builder.query({
            query: ({page=0, size=10}) => ({
                url: 'bus/retrieve-bus',
                method: 'POST',
                body:{page, size}
            }),
        }),

        updateBus: builder.mutation({
            query: ({ id, busData }) => ({
                url: `bus/update/${id}`,
                method: 'PUT',
                body: busData,
            }),
        }),
        deleteBus:builder.mutation({
            query:({id})=>({
                url:`bus/delete-bus/${id}`,
                method:'DELETE',
            })

        })
    }),
});

export const {
    useGetAvailableBusesQuery,  
    useCreateBusMutation,
    useGetAllBusDetailsQuery,
    useUpdateBusMutation,
    useDeleteBusMutation
} = BusApi;