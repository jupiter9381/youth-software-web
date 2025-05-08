import { useEffect, useState } from 'react';
import { handleValidationError } from '../../../functions/handleValidationError';

// slice
import { RootState } from '../../../reducers/store';
import { clearToken, setToken } from '../../../reducers/authSlice';

// libraries
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

// Hooks
import { useAuth } from '../../../services/auth/use-auth';

// component
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import LoadingScreen from '../../../components/LoadingScreen';
import WarningMessage from '../../../components/WarningMessage';
// useform
const schema = yup.object().shape({
  username: yup.string().required('Username is required!'),
  password: yup.string().required('Password is required!'),
});

const Login = (props: { setEnteredUsername: any }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.authReducer.token);
  const { loginUser, loadingMutation } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    // reset,
    // clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const username = watch('username');
  const password = watch('password');

  const [showPassword, setShowPassword] = useState(false);

  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string>('');

  const passwordAction = () => {
    setShowPassword(!showPassword);
  };

  const submit = async () => {
    setShowWarning(false);
    const useDetails = {
      username: username,
      password: password,
    };
    const loginUserResult = await loginUser(useDetails);

    if (loginUserResult.error) {
      if ('data' in loginUserResult.error) {
        const message = handleValidationError(loginUserResult.error, setError);
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
      if (loginUserResult.data) {
        dispatch(clearToken());
        dispatch(setToken(loginUserResult.data));
        // navigate("/home");
        props.setEnteredUsername(username);
        // navigate("/2FA");
      } else {
        props.setEnteredUsername(username);
        navigate('/2FA');
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token]);

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
        className="flex flex-col md:w-full sm:w-[70%] w-full lg:gap-8 gap-5 lg:px-5"
      >
        <h3 className="font-sans md:text-start text-center">
          Login to your account
        </h3>
        {showWarning && (
          <WarningMessage
            message={warningMessage}
            onCloseAction={() => setShowWarning(false)}
          />
        )}
        <div className="flex flex-col gap-5">
          <FloatingLabelInput
            register={register}
            formField="username"
            label="Username"
            value={username}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <FloatingLabelInput
            register={register}
            formField="password"
            label="Password"
            value={password}
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            passwordAction={passwordAction}
            showPassword={showPassword}
          />
        </div>
        <div className="flex justify-end">
          <span
            className="text-pm-500 cursor-pointer hover:underline"
            onClick={() => navigate('/forgot-password')}
          >
            {' '}
            Forgot password?
          </span>
        </div>
        <button
          type="submit"
          className="primary-btn base-btn"
          // onClick={submit}
        >
          Login
        </button>

        {/* <div className="flex flex-col items-center justify-center lg:gap-8 gap-5">
                    <span className="text-body-base-reg text-nt-700">
                        Or login with
                    </span>
                    <div className="flex items-center justify-center gap-6 lg:gap-8 flex-wrap">
                        <img
                            className="cursor-pointer"
                            src={Google}
                            alt="Google"
                        />
                        <img
                            className="cursor-pointer"
                            src={LinkedIn}
                            alt="LinkedIn"
                        />
                        <img
                            className="cursor-pointer"
                            src={Microsoft}
                            alt="Microsoft"
                        />
                        <img
                            className="cursor-pointer"
                            src={Facebook}
                            alt="Facebook"
                        />
                        <img
                            className="cursor-pointer"
                            src={Apple}
                            alt="Apple"
                        />
                    </div>
                </div> */}
      </form>
      {/* <div className="absolute bottom-[34px]"> */}
      <div className="">
        <span className="text-body-base-reg text-nt-700">
          Do not have an account?{' '}
          <span
            className="text-pm-500 cursor-pointer hover:underline"
            onClick={() => navigate('/signup')}
          >
            {' '}
            Sign up
          </span>
        </span>
      </div>

      {loadingMutation && <LoadingScreen />}
    </>
  );
};

export default Login;
