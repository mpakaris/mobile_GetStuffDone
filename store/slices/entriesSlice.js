import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userEntries: [],
};

export const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    addEntry: (state, action) => {
      state.userEntries.push(action.payload);
    },

    updateEntry: (state, action) => {
      const index = state.userEntries.findIndex(
        (entry) => entry.id === action.payload.id
      );
      if (index !== -1) {
        state.userEntries[index] = action.payload;
      }
    },

    deleteEntry: (state, action) => {
      state.userEntries = state.userEntries.filter(
        (entry) => entry.id !== action.payload
      );
    },
  },
});

export const { addEntry, updateEntry, deleteEntry } = entriesSlice.actions;
export default entriesSlice.reducer;
