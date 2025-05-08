import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FaviconState {
  icon: string | null;
}

const initialState: FaviconState = {
  icon: null,
};

const faviconSlice = createSlice({
  name: 'faviconSlice',
  initialState,
  reducers: {
    setFaviconState(state, action: PayloadAction<string | null>) {
      state.icon = action.payload;
    },
  },
});

export const { setFaviconState } = faviconSlice.actions;
export default faviconSlice.reducer;
