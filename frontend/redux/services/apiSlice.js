import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api`;
const baseQuery = fetchBaseQuery({ baseUrl: baseUrl });

/// Public paths ///
// initialize an api service that we'll inject all data endpoints
export const initialPublicApiSlice = createApi({
  reducerPath: "publicApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
