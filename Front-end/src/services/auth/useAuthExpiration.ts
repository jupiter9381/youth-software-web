import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/store';
import { clearToken, updateExpiration } from '../../reducers/authSlice';

export const useAuthExpiration = () => {
  const dispatch = useDispatch();
  const expiresIn = useSelector(
    (state: RootState) => state.authReducer.expiresIn,
  );

  const expiresAt = expiresIn ? Date.now() + expiresIn * 1000 : null;

  // console.log("expiresAt", expiresAt);
  // console.log("expiresIn", expiresIn);

  useEffect(() => {
    if (!expiresAt) return;

    // Ensure expiresAt is a valid timestamp in milliseconds
    const currentTime = Date.now();
    const timeout = expiresAt - currentTime;

    if (timeout <= 0) {
      // Token has already expired
      console.warn('Token has already expired.');
      dispatch(clearToken());
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    } else {
      let newSeconds = 0;
      const convertToSeconds = () => {
        newSeconds = timeout / 1000;
      };

      // Set up a timer to clear the token when it expires
      // console.log(`Setting token expiration in ${timeout}ms.`);
      convertToSeconds();
      const timer = setTimeout(() => {
        dispatch(clearToken());
        // dispatch(updateTimeOutSessionPopup(true))
      }, timeout);
      dispatch(updateExpiration(newSeconds));
      // Clear the timer when component unmounts or expiresAt changes
      return () => clearTimeout(timer);
    }
  }, [expiresAt, dispatch]);
};
