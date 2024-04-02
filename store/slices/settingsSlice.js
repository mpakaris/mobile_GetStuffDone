import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSettings: {},
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setUserSettings: (state, action) => {
      state.userSettings = action.payload;
    },

    updateUserSettings: (state, action) => {
      state.userSettings = { ...state.userSettings, ...action.payload };
    },

    clearUserSettings: (state) => {
      state.userSettings = {};
    },
  },
});

export const { setUserSettings, updateUserSettings, clearUserSettings } =
  settingsSlice.actions;
export default settingsSlice.reducer;
