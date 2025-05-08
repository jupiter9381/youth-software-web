import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressBookState {
  refetchList: boolean;
}

const initialState: AddressBookState = {
  refetchList: false,
};

const addressBookSlice = createSlice({
  name: 'addressBook',
  initialState,
  reducers: {
    triggerRefetch(state, action: PayloadAction<boolean>) {
      state.refetchList = action.payload;
    },
  },
});

export const { triggerRefetch } = addressBookSlice.actions;
export default addressBookSlice.reducer;
