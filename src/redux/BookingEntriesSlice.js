import { createSlice } from "@reduxjs/toolkit";

// selectors
export const selectBookingEntries = (state) => state.bookingEntries;
export const selectBookingEntryByDay = (state, date) =>{
  const day = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  state.bookingEntries.find((item) => item.day === day)
};

const bookingEntriesMap = [
  {
    day: "2020-8-2",
    start: "08:20",
    end: "12:35",
    break: "01:10",
  },
  {
    day: "2020-8-3",
    start: "09:40",
    end: "15:45",
    break: "02:15",
  },
];

export const initialState = bookingEntriesMap;

//slice
export const bookingEntriesSlice = createSlice({
  name: "bookingEntries",
  initialState: initialState,
  reducers: {
    editBookingEntry: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { editBookingEntry } = bookingEntriesSlice.actions;
