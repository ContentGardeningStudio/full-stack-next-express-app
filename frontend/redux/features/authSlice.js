import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    setUser: (state, action) => {
      state.userNotif = action.payload ? action.payload.notifications : null;
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    finishInitialLoad: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setAuth, setUser, setLogout, finishInitialLoad } =
  authSlice.actions;
export default authSlice.reducer;
