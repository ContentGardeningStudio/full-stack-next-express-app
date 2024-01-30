import { initialPrivateApiSlice } from "@/redux/services/apiSlice";

const privateApiSlice = initialPrivateApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (bodyFormData) => ({
        url: "/books",
        method: "POST",
        body: bodyFormData,
      }),
    }),
  }),
});

export const { useAddBookMutation } = privateApiSlice;
