import { configureStore } from "@reduxjs/toolkit";
import { initialPublicApiSlice } from "./services/apiSlice";

export const store = configureStore({
  reducer: {
    [initialPublicApiSlice.reducerPath]: initialPublicApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([initialPublicApiSlice.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});
