import { useEffect, useState } from 'react';

// libraries
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// functions
import SvgColorChanger from '../../../functions/SvgColorChanger';
import { handleValidationError } from '../../../functions/handleValidationError';

// component
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import Checkbox from '../../../components/Checkbox';
import LoadingScreen from '../../../components/LoadingScreen';
import Popup from '../../../components/Popup';
import SystemsIcon from '../../../components/SystemIcon';

import ArrowRight from '../../../assets/outline/Arrow-right.svg';

// Hooks
import { useAuth } from '../../../services/auth/use-auth';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../reducers/authSlice';

// useform
const schema = yup.object().shape({
  // fullName: yup.string().required("Full name is required!"),
  username: yup.string().required('Username is required!'),
  email: yup.string().required('Email is required!'),
  password: yup
    .string()
    .required('Password is required!')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain at least 1 letter, 1 number, and 1 special character (@$!%*#?&)',
    ),
});

interface SignUpProps {
  signupStep: { data: any; setSignStep: any };
  signupAccountType: { data: any; setSignupaccountType: any };
  planPaid: boolean;
  setViewRightSide: any;
  previewSetters: any;
}

const SignUp = (props: SignUpProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    // reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // // part 1
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // // part 3

  const username = watch('username');
  const email = watch('email');
  const password = watch('password');

  const [errorsState, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });

  const {
    loginUser,
    addUser,
    validateUserEmail,
    loadingMutation,
    successMutation,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const passwordAction = () => {
    setShowPassword(!showPassword);
  };

  const login = async (organisationId: any) => {
    const useDetails = {
      username: email,
      password: password,
    };
    const loginUserResult = await loginUser(useDetails);

    if (loginUserResult.data) {
      dispatch(setToken(loginUserResult.data));
      props.signupStep.setSignStep((prev: number) => (prev += 1));

      setOpenModal(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      window.location.reload();
    }
  };

  const submitData = async () => {
    const newData = {
      username: username,
      email: email,
      password: password,
      organisationType: props.signupAccountType.data.toUpperCase(),
    };

    const addUserResult = await addUser(newData);
    if (addUserResult.error) {
      if ('data' in addUserResult.error) {
        handleValidationError(addUserResult.error, setError);
        props.signupStep.setSignStep(0);
        navigate('/signup');
      }
    } else {
      login(addUserResult.data.organisationId);
    }
  };

  const clickBtn = async (e: any) => {
    e.preventDefault();
    if (props.signupStep.data + 1 === 1) {
      if (username && email && password) {
        const validateResult = await validateUserEmail(email);

        if (validateResult.error) {
          if ('data' in validateResult.error) {
            handleValidationError(validateResult.error, setError);
          }
        } else {
          if (validateResult.data.valid) {
            props.signupStep.setSignStep((prev: number) => (prev += 1));
            navigate('/signup/account');
          } else {
            setError('email', {
              type: 'manual',
              message: validateResult.data.message,
            });
          }
        }
      } else {
        if (!watch('username')) {
          setError('username', {
            type: 'manual',
            message: 'Username is required!',
          });
        }

        if (!watch('email')) {
          setError('email', {
            type: 'manual',
            message: 'Email is required!',
          });
        }

        if (!watch('password')) {
          setError('password', {
            type: 'manual',
            message: 'Password is required!',
          });
        }
      }
    } else {
      await submitData();
      // navigate("/home");
    }
  };

  useEffect(() => {
    if (username) {
      clearErrors('username');
    }

    if (email) {
      clearErrors('email');
    }

    if (password) {
      clearErrors('password');
    }

  }, [username, email, password]);

  useEffect(() => {
    if (username) {
      props.previewSetters(username);
    }
  }, [username]);

  return (
    <>
      <form
        className="flex flex-col md:w-full sm:w-[70%] w-full lg:gap-8 gap-5 lg:px-5"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            clickBtn(e);
          }
        }}
      >
        <h3 className=" font-sans md:text-start text-center">
          Create Account
        </h3>
        <div className="flex flex-col gap-5">
          {props.signupStep.data === 0 && (
            <>
              <div className="flex md:gap-2.5 gap-5 md:flex-row flex-col">
                <FloatingLabelInput
                  register={register}
                  formField="username"
                  label="User name"
                  value={username}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  flex={1}
                />

              </div>
              <FloatingLabelInput
                register={register}
                formField="email"
                label="Email"
                value={email}
                error={!!errors.email}
                helperText={errors.email?.message}
                flex={1}
              />
              <FloatingLabelInput
                register={register}
                formField="password"
                label="Password"
                value={password}
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                showPassword={showPassword}
                passwordAction={passwordAction}
                flex={1}
              />
            </>
          )}
        </div>
        <button className="primary-btn base-btn" onClick={clickBtn}>
          {props.signupStep.data === 0 && 'Submit'}
        </button>
      </form>

      <div>
        {props.signupStep.data === 0 && (
          // <div className='absolute bottom-[34px]'>
          <div className="">
            <span className="text-body-base-reg text-nt-700">
              Already have an account?{' '}
              <span
                className="text-pm-500 cursor-pointer hover:underline"
                onClick={() => navigate('/')}
              >
                {' '}
                Login
              </span>
            </span>
          </div>
        )}
      </div>

      {loadingMutation && <LoadingScreen />}
      <Popup
        isOpen={openModal && successMutation}
        closeAction={() => {}}
        disableOverlayClick={true}
      >
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <SystemsIcon status="Success" />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <h3 className="text-cente">Registration Successful</h3>
            <span className="text-center text-body-base-reg text-nt-700">
              You have successfully registered! Welcome aboard!
            </span>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default SignUp;
