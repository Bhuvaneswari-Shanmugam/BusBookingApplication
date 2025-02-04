import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const UsersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl:process.env.REACT_APP_AUTH_URL,
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
      query: (id) => ({
        url: `retrieve-user-detail/${id}`,
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
      query: ({ id, data }) => ({
        url: `update-user/${id}`,
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
