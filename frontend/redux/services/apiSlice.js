import { getFromLocalStorage } from "@/src/lib/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
const baseUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api`;
const token = getFromLocalStorage("token");

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Preventing multiple unauthorized errors
const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(setLogout());
  }
  return result;
};

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
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
