import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const UsersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:8080/auth/",
    prepareHeaders: (headers) => {
      const token =sessionStorage.getItem("Token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),

  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => ({
        url: `retrieve/${id}`,
        method: 'GET',
      }),
    }),


    getAllUsers: builder.query({
      query: (PaginationDTO) => ({
        url: 'fetch',
        method: 'POST',
        body: PaginationDTO
      }),
    }),


    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `update/${id}`,
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
