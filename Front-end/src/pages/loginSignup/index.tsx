import { useEffect, useState, useRef } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/store';

//assets

import Appdemo from '../../assets/appdemo.svg';

import ArrowLeft from '../../assets/outline/Arrow-left.svg';

// components
import Login from './components/Login';
import SignUp from './components/SignUp';
import AccountType from './components/AccountType';
import LivePreview from './components/LivePreview';
import TwoFA from './components/TwoFA';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/Resetpassword';

const LoginSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state: RootState) => state.authReducer.token);

  const [enteredUsername, setEnteredUsername] = useState('');

  const [signupStep, setSignStep] = useState(0);

  const [signupAccountType, setSignupaccountType] = useState('');

  const [planPaid, setPlanPaid] = useState(false); // true = yearly | false = monthly

  const [fullNamePreview, setFullNamePreview] = useState<string>('');
  const [logoPreview, setLogoPreview] = useState(null);
  const [agencyPreview, setAgencyPreview] = useState<string>('');

  const [viewRightSide, setViewRightSide] = useState(false);

  // const [customHeight, setCustomHeight] = useState("h-screen");

  const leftSideRef = useRef<HTMLDivElement>(null);
  const [leftSideHeight, setLeftSideHeight] = useState('95%');

  const [screenHeight, setScreenHeight] = useState(0);

  const previewSetters = (
    firstName: string,
    lastName: string,
    imageDetails: any,
    agencyName: string,
  ) => {
    setFullNamePreview(`${firstName} ${lastName}`);
    setAgencyPreview(agencyName);

    if (imageDetails) {
      const previewUrl: any = URL.createObjectURL(imageDetails);
      setLogoPreview(previewUrl);
    }
  };

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/signup') {
      if (signupStep !== 0) {
        setSignStep(0);
        setSignupaccountType('');
      }
    } else if (
      signupStep === 0 &&
      location.pathname !== '/forgot-password' &&
      location.pathname !== '/reset-password'
    ) {
      if (location.pathname !== '/2FA') {
        navigate('/');
      }
    } else {
      if (location.pathname === '/signup/account' && signupStep !== 1) {
        setSignStep(1);
      } else if (location.pathname === '/signup/agency' && signupStep !== 2) {
        setSignupaccountType('business');
        setSignStep(2);
      }
    }
  }, [location.pathname, signupStep, navigate]);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;

      // Set screen height and custom height classes
      setScreenHeight(height);

      if (width >= 770) {
        setViewRightSide(false);
      }

      // Measure left side height and update right side height if available
      // if (leftSideRef.current) {
      //     setLeftSideHeight((leftSideRef.current.offsetHeight -40) + "px");
      // }
    };

    handleResize(); // Run the height calculation immediately on mount
    window.addEventListener('resize', handleResize); // Listen for window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener
    };
  }, []);

  useEffect(() => {
    if (!leftSideRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (leftSideRef.current) {
        setLeftSideHeight(`${leftSideRef.current.offsetHeight / 16}rem`);
      }
    });

    resizeObserver.observe(leftSideRef.current);

    // Cleanup on unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (location) {
      const isHome = location.pathname.includes('home');
      if (isHome) {
        if (!token) {
          navigate('/');
        }
      }
    }
  }, [location, token]);

  return (
    <div className={`bg-nt-50 h-screen flex items-start overflow-y-auto p-5`}>
      <div className="h-full w-full flex items-start">
        {/* left side */}
        <div
          ref={leftSideRef}
          className={`${
            viewRightSide && 'hidden'
          } min-h-full bg-white p-8 shadow-elevation-1 rounded-3xl bg-white flex flex-col items-center justify-between gap-[1.87rem] md:w-[25rem] w-full relative`}
        >
          {/* <div className="absolute top-[40px] left-[40px]"> */}
          <div className="flex w-full">
          </div>
          {location.pathname.includes('/signup') ? (
            <SignUp
              signupStep={{ data: signupStep, setSignStep }}
              setViewRightSide={setViewRightSide}
              signupAccountType={{
                data: signupAccountType,
                setSignupaccountType: setSignupaccountType,
              }}
              planPaid={planPaid}
              previewSetters={previewSetters}
            />
          ) : location.pathname.includes('/2FA') ? (
            <TwoFA enteredUsername={enteredUsername} />
          ) : location.pathname.includes('/forgot-password') ? (
            <ForgotPassword />
          ) : location.pathname.includes('/reset-password') ? (
            <ResetPassword />
          ) : (
            <Login setEnteredUsername={setEnteredUsername} />
          )}
        </div>

        {/* right side */}
        <div
          className={`${viewRightSide ? 'flex' : 'hidden'} ${
            screenHeight > 900 &&
            (signupStep === 0 || signupStep === 1) &&
            signupAccountType === '' &&
            'items-center'
          } relative w-96 md:flex  flex-grow h-full flex items-center`}
          style={{
            height: leftSideHeight,
          }}
        >
          <div
            className={`w-full h-[95%] overflow-auto py-5 bg-pm-50 md:rounded-tr-6 md:rounded-br-6 md:rounded-tl-none md:rounded-bl-none  rounded-3xl lg:px-[5.6rem] md:px-10 px-8 py-10 ${signupStep === 0 && 'flex justify-center'} `}
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollbarWidth: 'thin', // For Firefox
            }}
          >
            <div
              className={`absolute top-0 left-0 ${
                viewRightSide ? 'flex' : 'hidden'
              }`}
            >
              <img
                className="cursor-pointer p-[1.87rem]"
                src={ArrowLeft}
                alt=""
                onClick={() => {
                  setViewRightSide(false);
                }}
                draggable="false"
              />
            </div>
            {/* {signupStep === 0 ||
            (signupStep === 1 && signupAccountType === '') ? (
              <img
                src={Appdemo}
                alt="Pass on"
                className="w-full h-full max-w-[56.25rem] max-h-[56.25rem]"
                draggable="false"
              />
            ) : signupStep === 1 && signupAccountType !== '' ? (
              <AccountType
                accountType={signupAccountType}
                planPaid={{
                  data: planPaid,
                  setPlanPaid,
                }}
              />
            ) : (
              <LivePreview
                logoPreview={{
                  data: logoPreview,
                  setLogoPreview: setLogoPreview,
                }}
                fullNamePreview={fullNamePreview}
                agencyPreview={agencyPreview}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
