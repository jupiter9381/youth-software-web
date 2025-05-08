import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { VITE_APP_ENDPOINT } = import.meta.env;

export const authAPI = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: VITE_APP_ENDPOINT }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userDetails) => ({
        url: 'auth/sign-in',
        method: 'POST',
        body: userDetails,
      }),
      invalidatesTags: [{ type: 'auth' }],
    }),
    registerUser: builder.mutation({
      query: (userDetails) => ({
        url: 'auth/sign-up',
        method: 'POST',
        body: userDetails,
      }),
      invalidatesTags: [{ type: 'auth' }],
    }),
    verifyOTP: builder.mutation({
      query: (otpDetails) => ({
        url: 'auth/verify-otp',
        method: 'POST',
        body: otpDetails,
      }),
      invalidatesTags: [{ type: 'auth' }],
    }),
    validateEmail: builder.mutation({
      query: (email) => ({
        url: 'auth/validate-email',
        method: 'POST',
        body: { email: email },
      }),
      invalidatesTags: [{ type: 'auth' }],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: email,
      }),
      invalidatesTags: [{ type: 'auth' }],
    }),
    resetPassword: builder.mutation({
      query: (details) => ({
        url: 'auth/reset-password',
        method: 'PUT',
        body: details,
      }),
      invalidatesTags: [{ type: 'auth' }],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useVerifyOTPMutation,
  useValidateEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authAPI;
