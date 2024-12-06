import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authAction";

const initialState: any = {
  id: null,
  name: null,
  token: null,
  error: null,
  loading: false,
  isAuthenticated: false,

};
export const login = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
      logout: (state) => {
      // toast.success("User Logout Successfully");
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

  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error= null
        state.isAuthenticated= false
      })

      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload.data
        state.error= null
        state.token= payload.data.accessToken
        state.isAuthenticated= true
        state.id=payload.data._id
        state.name=payload.data.name
        localStorage.setItem('token',payload.data.accessToken);

      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        
        state.isLoading = false;
        state.isSuccess = false;
        state.error = payload;
        state.isAuthenticated= false

      })



  },
});


export const {logout}= login.actions;