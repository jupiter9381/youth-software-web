import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  isSaveTriggered: boolean; // Example setting to toggle
  enableSaveChanges: boolean;
}

const initialState: SettingsState = {
  isSaveTriggered: false,
  enableSaveChanges: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTriggerSaveChanges(state, action: PayloadAction<boolean>) {
      state.isSaveTriggered = action.payload; // Set specific value
    },
    setEnableSaveChanges(state, action: PayloadAction<boolean>) {
      state.enableSaveChanges = action.payload; // Set specific value
    },
  },
});

export const { setTriggerSaveChanges, setEnableSaveChanges } =
  settingsSlice.actions;
export default settingsSlice.reducer;
