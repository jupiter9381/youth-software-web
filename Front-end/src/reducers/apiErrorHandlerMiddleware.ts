import { Middleware } from '@reduxjs/toolkit';
// import { logoutAction } from "../../reducers/authSlice";
import { clearToken, updateTimeOutSessionPopup } from './authSlice';

let forbiddenCount = 0; // Track consecutive 403 errors
const MAX_FORBIDDEN_THRESHOLD = 3; // Adjust as needed

export const apiErrorHandlerMiddleware: Middleware =
  (storeAPI) => (next) => (action: any) => {
    // Check if the action is an RTK Query rejected action
    if (action.type.endsWith('/rejected')) {
      const error = action.payload;

      if (error?.status === 401) {
        storeAPI.dispatch(updateTimeOutSessionPopup(true));
        console.warn('Unauthorized! Token has expired.');
      }

      if (error?.status === 403) {
        forbiddenCount++;
        console.warn(`Forbidden! Count: ${forbiddenCount}`);

        // If all endpoints return 403 (or threshold is met)
        if (forbiddenCount >= MAX_FORBIDDEN_THRESHOLD) {
          console.log('All endpoints are returning 403 errors!');
          storeAPI.dispatch(clearToken());
          // You can dispatch an action or handle it accordingly
        }
      }
    }

    return next(action);
  };
