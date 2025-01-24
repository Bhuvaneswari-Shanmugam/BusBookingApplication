import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SignupApi = createApi({
  reducerPath: "signupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080" ,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("Token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: ({email}: { email: string }) => ({
        url: "/otp/send-otp",
        method: "POST",
        params: {email},
      }),
    }),

    validateOtp: builder.mutation({
      query: ({ email, OTP }: { email: string; OTP: string }) => ({
        url: '/otp/validate-otp',
        method: 'GET',
        params: { email, OTP }, 
      }),
    }),
   
    signup: builder.mutation({
      query: (data) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: data,
      }),
    }),

    signin: builder.mutation({
      query: (data) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: data,
      }),
    }),
  
    forgotPassword: builder.mutation({
      query: ({ email, password, confirmPassword }) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        params: { email, password, confirmPassword },
      }),
    }),
  }),
});

export const { 
  useSignupMutation, 
  useSigninMutation, 
  useSendOtpMutation, 
  useValidateOtpMutation ,
  useForgotPasswordMutation
} = SignupApi;
