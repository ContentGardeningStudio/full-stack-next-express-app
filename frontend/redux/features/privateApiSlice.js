import { initialPrivateApiSlice } from "@/redux/services/apiSlice";

const privateApiSlice = initialPrivateApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verify: builder.mutation({
      query: () => ({
        url: "/auth/verify/",
        method: "POST",
      }),
    }),
    addBook: builder.mutation({
      query: (bodyFormData) => ({
        url: "/books",
        method: "POST",
        body: bodyFormData,
      }),
    }),
  }),
});

export const { useVerifyMutation, useAddBookMutation } = privateApiSlice;
