import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  profile: {
    displayName: string;
    displayPhoto?: string;
  };
}

interface Trial {
  // organisationId: string;
  // startDate: string;
  // durationInDays: number;
  trialEndDate: string;
  isInTrial: boolean;
  isSubscribed: boolean;
  plan: any;
  status: any;
  subscriptionEndDate: string;
  name: string;
}

interface AuthState {
  token: string | null;
  expiresIn: number | null;
  userOrganisationId: string | null;
  user: User | null;
  trial: Trial | null;
  timeOutSessionPopup: boolean;
  organisationType: string | null;
  role: string | null;
  isSelectedUserOrgId: boolean;
  dateFormat: string | null;
}

const initialState: AuthState = {
  token: null,
  expiresIn: null,
  userOrganisationId: null,
  user: null,
  trial: null,
  timeOutSessionPopup: false,
  organisationType: null,
  role: null,
  isSelectedUserOrgId: false,
  dateFormat: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{ token: string; expiresIn: number }>,
    ) => {
      state.token = action.payload.token;
      state.expiresIn = action.payload.expiresIn;
    },
    setUserOrganisationId: (state, action: PayloadAction<string | null>) => {
      state.userOrganisationId = action.payload;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setTrial: (state, action: PayloadAction<Trial>) => {
      state.trial = action.payload;
    },
    clearToken: (state) => {
      state.userOrganisationId = null;
      state.user = null;
      state.expiresIn = null;
      state.token = null;
      state.timeOutSessionPopup = false;
      state.isSelectedUserOrgId = false;
      (state.organisationType = null),
        (state.role = null),
        (state.isSelectedUserOrgId = false);
    },
    updateExpiration: (state, action: PayloadAction<number>) => {
      if (state.expiresIn) {
        state.expiresIn = action.payload;
      }
    },
    updateTimeOutSessionPopup: (state, action: PayloadAction<boolean>) => {
      state.timeOutSessionPopup = action.payload;
    },
    setOrganisationType: (state, action: PayloadAction<string>) => {
      state.organisationType = action.payload;
    },
    setUserRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setIsSelectedUserOrgId: (state, action: PayloadAction<boolean>) => {
      state.isSelectedUserOrgId = action.payload;
    },
    setDateFormat: (state, action: PayloadAction<string>) => {
      state.dateFormat = action.payload;
    },
  },
});

export const {
  setToken,
  setUserOrganisationId,
  setUser,
  clearToken,
  updateExpiration,
  setTrial,
  updateTimeOutSessionPopup,
  setOrganisationType,
  setUserRole,
  setIsSelectedUserOrgId,
  setDateFormat,
} = authSlice.actions;
export default authSlice.reducer;
