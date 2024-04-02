// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import entriesReducer from "./slices/entriesSlice";
import settingsReducer from "./slices/settingsSlice";
import usersReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    settings: settingsReducer,
    entries: entriesReducer,
  },
});
