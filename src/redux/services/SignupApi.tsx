import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const SignupApi = createApi({
  reducerPath: "signupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("Token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),


  endpoints: (builder) => ({  
    signup: builder.mutation({
      query: (data) => ({
        url: 'sign-up',
        method: 'POST',
        body: data,
      }),
    }),
    signin: builder.mutation({  
      query: (data) => ({
        url: 'sign-in',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignupMutation,useSigninMutation } = SignupApi;
