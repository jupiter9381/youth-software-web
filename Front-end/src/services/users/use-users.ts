import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/store';

import {
  useGetProfileQuery,
  useGetUserOrganisationQuery,
  useUpdateProfilePhotoMutation,
  useUpdate2FAMutation,
  useGetUserSettingsQuery,
  useUpdateUserSettingsMutation,
  useUpdateUserPasswordMutation,
  useUpdateUserAccountMutation,
  useDeleteUserAccountMutation,
} from './usersAPI';

export const useUsers = () => {
  const userOrganisationId = useSelector(
    (state: RootState) => state.authReducer.userOrganisationId,
  );
  const token = useSelector((state: RootState) => state.authReducer.token);

  // Get profile
  const {
    data: getProfile,
    isSuccess: getProfileSuccess,
    isError: getProfileError,
    isLoading: getProfileLoading,
    isFetching: getProfileFetching,
    error: getProfileErrorMessage,
    refetch: refetchGetProfile,
  } = useGetProfileQuery(undefined, {
    skip: !userOrganisationId, // Properly skip the query if userOrganisationId is null or undefined
  });

  // Get UserOrganisation
  const {
    data: getUserOrganisation,
    isSuccess: getUserOrganisationSuccess,
    isError: getUserOrganisationError,
    isLoading: getUserOrganisationLoading,
    isFetching: getUserOrganisationFetching,
    error: getUserOrganisationErrorMessage,
    refetch: refetchGetUserOrganisation,
  } = useGetUserOrganisationQuery(undefined, {
    skip: !token, // Properly skip the query if userOrganisationId is null or undefined
  });

  // Get UserSettings
  const {
    data: getUserSettings,
    isSuccess: getUserSettingsSuccess,
    isError: getUserSettingsError,
    isLoading: getUserSettingsLoading,
    isFetching: getUserSettingsFetching,
    error: getUserSettingsErrorMessage,
    refetch: refetchGetUserSettings,
  } = useGetUserSettingsQuery(undefined, {
    skip: !token || !userOrganisationId, // Properly skip the query if userOrganisationId is null or undefined
  });

  // update profile photo
  const [
    updatePhoto,
    {
      isLoading: updatePhotoLoading,
      isError: updatePhotoError,
      isSuccess: updatePhotoSuccess,
    },
  ] = useUpdateProfilePhotoMutation();

  // update profile photo
  const [
    update2FA,
    {
      isLoading: update2FALoading,
      isError: update2FAError,
      isSuccess: update2FASuccess,
    },
  ] = useUpdate2FAMutation();

  // update profile photo
  const [
    updateUserSettings,
    {
      isLoading: updateUserSettingsLoading,
      isError: updateUserSettingsError,
      isSuccess: updateUserSettingsSuccess,
    },
  ] = useUpdateUserSettingsMutation();

  // update password
  const [
    updateUserPassword,
    {
      isLoading: updateUserPasswordLoading,
      isError: updateUserPasswordError,
      isSuccess: updateUserPasswordSuccess,
    },
  ] = useUpdateUserPasswordMutation();

  const [
    updateUserAccount,
    {
      isLoading: updateUserAccountLoading,
      isError: updateUserAccountError,
      isSuccess: updateUserAccountSuccess,
    },
  ] = useUpdateUserAccountMutation();

  const [
    deleteUserAccount,
    {
      isLoading: deleteUserAccountLoading,
      isError: deleteUserAccountError,
      isSuccess: deleteUserAccountSuccess,
    },
  ] = useDeleteUserAccountMutation();

  // query
  const successQuery =
    getProfileSuccess || getUserOrganisationSuccess || getUserSettingsSuccess;
  const errorQuery =
    getProfileError || getUserOrganisationError || getUserSettingsError;
  const loadingQuery =
    getProfileLoading || getUserOrganisationLoading || getUserSettingsLoading;
  const fetchingQuery =
    getProfileFetching ||
    getUserOrganisationFetching ||
    getUserSettingsFetching;
  const errorMessageQuery =
    getProfileErrorMessage ||
    getUserOrganisationErrorMessage ||
    getUserSettingsErrorMessage;

  // mutation
  const loadingMutation =
    updatePhotoLoading ||
    update2FALoading ||
    updateUserSettingsLoading ||
    updateUserPasswordLoading ||
    updateUserAccountLoading ||
    deleteUserAccountLoading;
  const errorMutation =
    updatePhotoError ||
    update2FAError ||
    updateUserSettingsError ||
    updateUserPasswordError ||
    updateUserAccountError ||
    deleteUserAccountError;
  const successMutation =
    updatePhotoSuccess ||
    update2FASuccess ||
    updateUserSettingsSuccess ||
    updateUserPasswordSuccess ||
    updateUserAccountSuccess ||
    deleteUserAccountSuccess;
  return {
    getProfile,
    refetchGetProfile,
    getUserOrganisation,
    refetchGetUserOrganisation,
    successQuery,
    errorQuery,
    loadingQuery,
    fetchingQuery,
    errorMessageQuery,
    updatePhoto,
    update2FA,
    loadingMutation,
    errorMutation,
    successMutation,
    getUserSettings,
    refetchGetUserSettings,
    updateUserSettings,
    updateUserPassword,
    updateUserAccount,
    deleteUserAccount,
  };
};
