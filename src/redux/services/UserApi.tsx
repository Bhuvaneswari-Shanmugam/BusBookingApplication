import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const UsersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:8080/auth/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("Token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),

  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => ({
        url: `retrieve/${userId}`,
        method: 'GET',
      }),
    }),


    getAllUsers: builder.query({
      query: () => ({
        url: 'retrieve-all-user',
        method: 'GET',
      }),
    }),

    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
          url: `update/${userId}`,
          method: 'PUT',
          body: data,
      }),
  }),
  

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: 'DELETE',
      }),
    }),

  }),
});

export const { 
  useGetUserByIdQuery,
  useGetAllUsersQuery, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} = UsersApi;
