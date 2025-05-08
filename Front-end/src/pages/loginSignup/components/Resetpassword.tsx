import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import { useAuth } from '../../../services/auth/use-auth';
import LoadingScreen from '../../../components/LoadingScreen';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleValidationError } from '../../../functions/handleValidationError';
import WarningMessage from '../../../components/WarningMessage';

const schema = yup.object().shape({
  password: yup.string().required('New password is required!'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPassword, loadingMutation } = useAuth();

  // const params = new URLSearchParams(location.pathname);
  const location = useLocation();
  const email = new URLSearchParams(location.search)
    .get('email')
    ?.replace(/ /g, '+');
  const token = new URLSearchParams(location.search).get('token');

  const { handleSubmit, watch, register, setError, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState([false, false]);

  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string>('');

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const submit = async () => {
    const userDetails = {
      email: email,
      token: token,
      password: password,
      confirmPassword: confirmPassword,
    };
    const result = await resetPassword(userDetails);
    if (result.error) {
      if ('data' in result.error) {
        const message = handleValidationError(result.error, setError);
        if (!message?.field) {
          if (
            typeof message?.message === 'string' ||
            message?.message === undefined
          ) {
            setWarningMessage(message?.message ?? '');
            setShowWarning(true);
          }
        }
      }
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // Prevents accidental form submission
            handleSubmit(submit)(); // Manually triggers form submission
          }
        }}
        className="flex flex-col md:w-full sm:w-[70%] w-full lg:gap-6 gap-5 lg:px-5"
      >
        <h3 className="font-sans md:text-start text-center">Reset password</h3>
        {showWarning && (
          <WarningMessage
            message={warningMessage}
            onCloseAction={() => setShowWarning(false)}
          />
        )}
        <FloatingLabelInput
          register={register}
          label="Create password"
          type="password"
          formField="password"
          value={password}
          showPassword={showPassword[0]}
          passwordAction={() => {
            setShowPassword((prev) =>
              prev.map((item, index) => (index === 0 ? !item : item)),
            );
          }}
          error={!!formState.errors.password}
          helperText={formState.errors?.password?.message}
        />

        <FloatingLabelInput
          register={register}
          label="Confirm password"
          type="password"
          formField="confirmPassword"
          value={confirmPassword}
          showPassword={showPassword[1]}
          passwordAction={() => {
            setShowPassword((prev) =>
              prev.map((item, index) => (index === 1 ? !item : item)),
            );
          }}
          error={!!formState.errors.confirmPassword}
          helperText={formState.errors?.confirmPassword?.message}
        />
        <button type="submit" className="primary-btn base-btn mt-2">
          Save
        </button>
      </form>
      <div className="flex justity-center min-h-10"></div>
      {loadingMutation && <LoadingScreen />}
    </>
  );
};

export default ResetPassword;
