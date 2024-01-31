import { initialPublicApiSlice } from "@/redux/services/apiSlice";

const publicApiSlice = initialPublicApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/signup",
        method: "POST",
        body: { email, password },
      }),
    }),
    signIn: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    getBooks: builder.query({
      query: () => "/books",
    }),
    getTopBooks: builder.query({
      query: () => "/books/bestrating",
    }),
    findBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetBooksQuery,
  useGetTopBooksQuery,
  useFindBookQuery,
} = publicApiSlice;
