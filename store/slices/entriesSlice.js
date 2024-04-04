import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userEntries: [
    // {
    //   date: "2024-04-20",
    //   entry: [
    //     "watched a movie",
    //     "cleaned the house",
    //     "went to the gym",
    //     "cooked dinner",
    //     "went for shopping",
    //     "planted a tree",
    //     "walked the dog",
    //   ],
    //   categories: [
    //     "environment",
    //     "housework",
    //     "pet",
    //     "fitness",
    //     "shopping",
    //     "cooking",
    //     "leisure",
    //   ],
    // },
    // {
    //   date: "2024-04-15",
    //   entry: [
    //     "ran a marathon",
    //     "cleaned the house",
    //     "attended a seminar",
    //     "went for shopping",
    //     "planted a tree",
    //   ],
    //   categories: [
    //     "environment",
    //     "housework",
    //     "education",
    //     "fitness",
    //     "shopping",
    //   ],
    // },
    // {
    //   date: "2024-04-14",
    //   entry: [
    //     "read a book",
    //     "visited a friend",
    //     "went for shopping",
    //     "washed the car",
    //   ],
    //   categories: ["hobbies", "social", "shopping", "housework"],
    // },
    // {
    //   date: "2024-04-13",
    //   entry: [
    //     "went for shopping",
    //     "washed the car",
    //     "walked the dog",
    //     "planted a tree",
    //     "attended a seminar",
    //     "cooked dinner",
    //   ],
    //   categories: [
    //     "environment",
    //     "pet",
    //     "housework",
    //     "education",
    //     "shopping",
    //     "cooking",
    //   ],
    // },
    // {
    //   date: "2024-04-12",
    //   entry: ["cooked dinner", "read a book"],
    //   categories: ["hobbies", "cooking"],
    // },
    // {
    //   date: "2024-04-11",
    //   entry: [
    //     "read a book",
    //     "painted a picture",
    //     "practiced guitar",
    //     "went to the gym",
    //     "planted a tree",
    //     "went for shopping",
    //   ],
    //   categories: ["hobbies", "shopping", "fitness", "environment"],
    // },
    // {
    //   date: "2024-04-09",
    //   entry: ["attended a seminar", "practiced guitar", "read a book"],
    //   categories: ["hobbies", "education"],
    // },
    // {
    //   date: "2024-04-08",
    //   entry: [
    //     "walked the dog",
    //     "finished a project",
    //     "read a book",
    //     "watched a movie",
    //     "ran a marathon",
    //     "went for shopping",
    //     "visited a friend",
    //   ],
    //   categories: [
    //     "work",
    //     "social",
    //     "pet",
    //     "fitness",
    //     "hobbies",
    //     "shopping",
    //     "leisure",
    //   ],
    // },
    // {
    //   date: "2024-04-05",
    //   entry: ["planted a tree", "visited a friend", "ran a marathon"],
    //   categories: ["environment", "social", "fitness"],
    // },
    // {
    //   date: "2024-04-04",
    //   entry: ["went for shopping", "went to the gym", "cooked dinner"],
    //   categories: ["shopping", "fitness", "cooking"],
    // },
  ],
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
