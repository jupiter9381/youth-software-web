import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../../reducers/store';

const { VITE_APP_ENDPOINT } = import.meta.env;

export const usersAPI = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_APP_ENDPOINT,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).authReducer.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      // Add x-organisation-id only for the getProfile endpoint
      const organisationId = (getState() as RootState).authReducer
        .userOrganisationId;

      if (organisationId && endpoint != 'deleteUserAccount') {
        headers.set('x-organisation-id', organisationId);
      }

      return headers;
    },
  }),
  tagTypes: ['users'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/users/profile',
      // ,
      //
      // providesTags: (result) =>
      //
      //     result
      //         ? [
      //               ...result.map(
      //                   ({ _id }) => ({ type: "users", _id } as const)
      //               ),
      //               { type: "users", id: "LIST" },
      //           ]
      //         : [{ type: "users", id: "LIST" }],
    }),
    getUserOrganisation: builder.query({
      query: () => '/user-organisations',
    }),
    updateProfilePhoto: builder.mutation({
      query: (formData) => ({
        url: '/users/photo',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: [{ type: 'users' }],
    }),
    update2FA: builder.mutation({
      query: (status: any) => ({
        url: '/users/update-2fa',
        method: 'PUT',
        body: status,
      }),
      invalidatesTags: [{ type: 'users' }],
    }),
    getUserSettings: builder.query({
      query: () => '/users/settings',
    }),
    updateUserSettings: builder.mutation({
      query: (timezone: any) => ({
        url: '/users/settings',
        method: 'PUT',
        body: timezone,
      }),
      invalidatesTags: [{ type: 'users' }],
    }),

    updateUserPassword: builder.mutation({
      query: (details: any) => ({
        url: '/users/account/update-password',
        method: 'PUT',
        body: details,
      }),
      invalidatesTags: [{ type: 'users' }],
    }),

    updateUserAccount: builder.mutation({
      query: (details: any) => ({
        url: '/users/account',
        method: 'PUT',
        body: details,
      }),
      invalidatesTags: [{ type: 'users' }],
    }),
    deleteUserAccount: builder.mutation({
      query: () => ({
        url: '/users/account',
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'users' }],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetUserOrganisationQuery,
  useUpdateProfilePhotoMutation,
  useUpdate2FAMutation,
  useGetUserSettingsQuery,
  useUpdateUserSettingsMutation,
  useUpdateUserPasswordMutation,
  useUpdateUserAccountMutation,
  useDeleteUserAccountMutation,
} = usersAPI;
