import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// custom middleware
import { apiErrorHandlerMiddleware } from './apiErrorHandlerMiddleware';

// API
import { authAPI } from '../services/auth/authAPI';
import { usersAPI } from '../services/users/usersAPI';

// Slices
import authReducer from '../reducers/authSlice';
import organisationReducer from '../reducers/organisationSlice';
import addressBookReducer from '../reducers/addressBookSlice';
import settingsReducer from '../reducers/settingsSlice';
import faviconReducer from '../reducers/faviconSlice';

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  authReducer: authReducer,
  addressBookReducer: addressBookReducer,
  settingsReducer: settingsReducer,
  organisationReducer: organisationReducer,
  faviconReducer: faviconReducer,
});

const persistConfig: any = {
  key: 'root',
  storage, // Specify the storage engine
  // You can add more configuration options here
  blacklist: [
    authAPI.reducerPath,
    usersAPI.reducerPath,
    addressBookReducer,
    settingsReducer,
    organisationReducer,
    faviconReducer,
  ], // Exclude these slices from persistence (Dapat ang authReducer lang ang gina persist)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authAPI.middleware,
      usersAPI.middleware,
      apiErrorHandlerMiddleware, // Global middleware for error handling
    ),
});

const persistor = persistStore(configStore);

export { configStore, persistor };
export type RootState = ReturnType<typeof configStore.getState>; //to get states from slices
