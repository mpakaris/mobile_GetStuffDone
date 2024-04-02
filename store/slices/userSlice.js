// slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userObject: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userObject = action.payload;
    },
    clearUser: (state) => {
      state.userObject = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
