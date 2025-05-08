import { useState, useEffect } from 'react';

// libraries
// import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// slice
// import { setToken } from "../../../reducers/authSlice";

// hooks
import { useAuth } from '../../../services/auth/use-auth';

// components
import LoadingScreen from '../../../components/LoadingScreen';
import { clearToken, setToken } from '../../../reducers/authSlice';

const TwoFA = (props: { enteredUsername: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    addOTPDetails,
    loadingMutation,
    errorMutation,
    successMutation,
    errorMessageMutation,
  } = useAuth();

  const [values, setValues] = useState<string[]>(Array(6).fill(''));

  const [error, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits (0-9) and empty strings
    setError(false);

    const updatedValues = [...values];
    updatedValues[index] = value;
    setValues(updatedValues);

    // Move to the next input if the current one is filled
    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      setError(false);

      const previousInput = document.getElementById(`digit-${index - 1}`);
      if (previousInput) {
        previousInput.focus();
        const updatedValues = [...values];
        updatedValues[index - 1] = '';
        setValues(updatedValues);
      }
    }
  };

  const submitOTP = async (e: any) => {
    e.preventDefault();
    if (values.every((value) => value !== '')) {
      setError(false);
      const otpDetails = {
        username: props.enteredUsername,
        code: `${values.join('')}`,
      };

      const result = await addOTPDetails(otpDetails);

      if (result.data) {
        dispatch(clearToken());
        dispatch(setToken(result.data));
        window.location.reload();
      }
    } else {
      setErrorMessage('Please fill in all fields');
      setError(true);
    }
  };

  useEffect(() => {
    if (!props.enteredUsername) {
      navigate('/');
    }
  }, [props.enteredUsername]);

  useEffect(() => {
    if (!loadingMutation) {
      if (errorMutation && errorMessageMutation) {
        if ('data' in errorMessageMutation && errorMessageMutation.data) {
          const errorData = errorMessageMutation.data as {
            error: string;
            message: string;
            statusCode: number;
          };
          setErrorMessage(errorData.message);
          setError(true);
        }

        // This is temporary
        // let mockResponseData = {
        //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjY2FlZWMxOC00OGRhLTRmZTMtYWVjNy1kNjQ2OGJjZTg3ODkiLCJpYXQiOjE3MzE1OTQ0MzEsImV4cCI6MTczMTU5ODAzMX0.o9lP39b5izqxZxbtWELtc8ZA98NkhUT7CiodmA7sPbQ",
        //     expiresIn: 3600,
        // };

        // dispatch(setToken(mockResponseData));
        // navigate("/home");
      } else if (successMutation) {
        // let mockResponseData = {
        //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjY2FlZWMxOC00OGRhLTRmZTMtYWVjNy1kNjQ2OGJjZTg3ODkiLCJpYXQiOjE3MzE1OTQ0MzEsImV4cCI6MTczMTU5ODAzMX0.o9lP39b5izqxZxbtWELtc8ZA98NkhUT7CiodmA7sPbQ",
        //     expiresIn: 3600,
        // };
        // dispatch(setToken(mockResponseData));
        // navigate("/home");
      }
    }
  }, [loadingMutation, errorMutation, successMutation, errorMessageMutation]);

  return (
    <>
      <form
        onSubmit={submitOTP}
        className="flex flex-col md:w-full sm:w-[70%] w-full lg:gap-[32px] gap-[20px] lg:px-[20px]"
      >
        <h3 className=" font-sans md:text-start text-center">
          Verify your account
        </h3>

        <span className="text-body-base-reg text-nt-700 md:text-start text-center">
          Enter 6-digit code sent to your email{' '}
          <span className="text-nt-300">
            (or whichever method user had chosen: SMS, Email)
          </span>
        </span>
        <div className="flex justify-center md:gap-4 sm:gap-2.5 gap-1.5">
          {values.map((digit: any, index: number) => (
            <input
              key={index}
              id={`digit-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className={`w-12 h-12 text-body-big-str text-center border ${
                error ? 'border-sys-rd600' : 'border-nt-200'
              }  rounded-[8px] focus:outline-none`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
            />
          ))}
        </div>
        {error && (
          <p className={`mt-1 text-caption-reg text-sys-rd600 text-center`}>
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          className="primary-btn base-btn"
          // onClick={submit}
        >
          Verify
        </button>
      </form>
      {/* <div className="absolute bottom-[34px]"> */}
      <div className="">
        <span className="text-body-base-reg text-nt-700">
          Lost your device?{' '}
          <span
            className="text-pm-500 cursor-pointer hover:underline"
            onClick={() => navigate('/')}
          >
            {' '}
            Try another way
          </span>
        </span>
      </div>
      {loadingMutation && <LoadingScreen />}
    </>
  );
};

export default TwoFA;
