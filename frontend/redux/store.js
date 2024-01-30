import { configureStore } from "@reduxjs/toolkit";
import {
  initialPublicApiSlice,
  initialPrivateApiSlice,
} from "./services/apiSlice";

export const store = configureStore({
  reducer: {
    [initialPublicApiSlice.reducerPath]: initialPublicApiSlice.reducer,
    [initialPrivateApiSlice.reducerPath]: initialPrivateApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      [initialPublicApiSlice.middleware],
      [initialPrivateApiSlice.middleware]
    ),
  devTools: process.env.NODE_ENV !== "production",
});
