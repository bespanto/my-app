// redux
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// custom reducer
import { personalDataSlice } from "./PersonalDataSlice";
import { uiStateSlice } from "./UiStateSlice";
import { bookingEntriesSlice } from "./BookingEntriesSlice";

// custom reducer hier einfügen
const reducer = {
  personalData: personalDataSlice.reducer,
  uiState: uiStateSlice.reducer,
  bookingEntries: bookingEntriesSlice.reducer
};

//middleware hier einfügen
const middleware = [...getDefaultMiddleware()];

export default configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});
