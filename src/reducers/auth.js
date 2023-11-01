import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  isLoggedIn: false,
  loginError: null,
};

const authSlice = createSlice({
  name: "login",
  initialState: defaultState,
  reducers: {
    LOGIN_SUCCESS: (state) => {
      return {
        ...state,
        isLoggedIn: true,
        loginError: null,
      };
    },
    LOGIN_FAILURE: (state, action) => {
      return {
        ...state,
        loginError: action?.error ?? null,
        isLoggedIn: false,
      };
    },
  },
});

export const { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } =
  authSlice.actions;

export default authSlice.reducer;
