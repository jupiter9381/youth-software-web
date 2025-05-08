import {
  useLoginUserMutation,
  useRegisterUserMutation,
  useVerifyOTPMutation,
  useValidateEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from './authAPI';

export const useAuth = () => {
  // login user
  const [
    loginUser,
    {
      isLoading: loginUserLoading,
      isError: loginUserError,
      isSuccess: loginUserSuccess,
      error: loginUserErrorMessage,
    },
  ] = useLoginUserMutation();

  // register user
  const [
    addUser,
    {
      isLoading: addUserLoading,
      isError: addUserError,
      isSuccess: addUserSuccess,
      error: addUserErrorMessage,
    },
  ] = useRegisterUserMutation();

  // Verify OTP
  const [
    addOTPDetails,
    {
      isLoading: addOTPDetailsLoading,
      isError: addOTPDetailsError,
      isSuccess: addOTPDetailsSuccess,
      error: addOTPDetailsErrorMessage,
    },
  ] = useVerifyOTPMutation();

  // validate email
  const [
    validateUserEmail,
    {
      isLoading: validateUserEmailLoading,
      isError: validateUserEmailError,
      isSuccess: validateUserEmailSuccess,
      error: validateUserErrorMessage,
    },
  ] = useValidateEmailMutation();

  const [
    forgotPassword,
    {
      isLoading: forgotPasswordLoading,
      isError: forgotPasswordError,
      isSuccess: forgotPasswordSuccess,
      error: forgotPasswordMessage,
    },
  ] = useForgotPasswordMutation();

  const [
    resetPassword,
    {
      isLoading: resetPasswordLoading,
      isError: resetPasswordError,
      isSuccess: resetPasswordSuccess,
      error: resetPasswordMessage,
    },
  ] = useResetPasswordMutation();

  // mutation
  const loadingMutation =
    loginUserLoading ||
    addUserLoading ||
    addOTPDetailsLoading ||
    validateUserEmailLoading ||
    forgotPasswordLoading ||
    resetPasswordLoading;

  const errorMutation =
    loginUserError ||
    addUserError ||
    addOTPDetailsError ||
    validateUserEmailError ||
    forgotPasswordError ||
    resetPasswordError;

  const successMutation =
    loginUserSuccess ||
    addUserSuccess ||
    addOTPDetailsSuccess ||
    validateUserEmailSuccess ||
    forgotPasswordSuccess ||
    resetPasswordSuccess;

  const errorMessageMutation =
    loginUserErrorMessage ||
    addUserErrorMessage ||
    addOTPDetailsErrorMessage ||
    validateUserErrorMessage ||
    forgotPasswordMessage ||
    resetPasswordMessage;

  return {
    loginUser,
    addUser,
    addOTPDetails,
    validateUserEmail,
    forgotPassword,
    resetPassword,
    loadingMutation,
    errorMutation,
    successMutation,
    errorMessageMutation,
  };
};
