import { getFromLocalStorage } from "@/src/lib/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api`;
const token = getFromLocalStorage("token");

const baseAuthQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// initialize an api service that we'll inject all data endpoints
/// Public paths ///
export const initialPublicApiSlice = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: () => ({}),
});

/// Private paths ///
export const initialPrivateApiSlice = createApi({
  reducerPath: "privateApi",
  baseQuery: baseAuthQuery,
  endpoints: () => ({}),
});
