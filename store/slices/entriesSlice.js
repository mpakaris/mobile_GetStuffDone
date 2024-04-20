import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllEntriesOfUser } from "../../api/firebase";

// Async thunk for fetching entries from the database
export const fetchEntriesFromDB = createAsyncThunk(
  "entries/fetchEntries",
  async (uid, thunkAPI) => {
    try {
      const entries = await getAllEntriesOfUser(uid);
      console.log(JSON.stringify(entries));
      return entries;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  userEntries: [],
  status: "idle", // can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
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

  extraReducers: (builder) => {
    builder
      .addCase(fetchEntriesFromDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEntriesFromDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched entries to the state
        state.userEntries = action.payload;
      })
      .addCase(fetchEntriesFromDB.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addEntry, updateEntry, deleteEntry } = entriesSlice.actions;
export default entriesSlice.reducer;
