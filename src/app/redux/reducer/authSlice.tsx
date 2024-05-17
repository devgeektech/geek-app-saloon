import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  id: null,
  name: null,
  token: null,
  error: null,
  loading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    loginSuccess: (state, action) => {
      const { _id, name, accessToken } = action.payload.data;
      toast.success(`Welcome ${name}`);
      return {
        ...state,
        user: action.payload.data,
        id: _id,
        name: name,
        token: accessToken,
        loading: false,
        error: null,
        isAuthenticated: true,
      };
    },
    loginFailure: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    logout: (state) => {
      toast.success("User Logout Successfully");
      return {
        ...state,
        user: null,
        id: null,
        name: null,
        token: null,
        isAuthenticated: false,
      };
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
