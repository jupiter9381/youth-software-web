import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TrialData {
  organisationId: string | null;
  startDate: string | null;
  durationInDays: number | null;
}

interface OrganisationSlice {
  type: string | null;
  countryCode: string | null;
  name: string | null;
  phoneNumber: string | null;
  industry: string | null;
  trial: TrialData;
}

const initialState: OrganisationSlice = {
  type: null,
  countryCode: null,
  name: null,
  phoneNumber: null,
  industry: null,
  trial: {
    organisationId: null,
    startDate: null,
    durationInDays: null,
  },
};

const organisationSlice = createSlice({
  name: 'organisation',
  initialState,
  reducers: {
    setOrgDetails: (
      state,
      action: PayloadAction<{
        name: string;
        type: string;
        countryCode: string;
        phoneNumber: string | null;
        industry: string | null;
        trial: {
          organisationId: string | null;
          startDate: string | null;
          durationInDays: number | null;
        };
      }>,
    ) => {
      state.name = action.payload.name;
      state.type = action.payload.type;
      state.countryCode = action.payload.countryCode;
      state.phoneNumber = action.payload.phoneNumber;
      state.industry = action.payload.industry;
      state.trial = {
        organisationId: action.payload.trial.organisationId,
        startDate: action.payload.trial.startDate,
        durationInDays: action.payload.trial.durationInDays,
      };
    },
  },
});

export const { setOrgDetails } = organisationSlice.actions;
export default organisationSlice.reducer;
