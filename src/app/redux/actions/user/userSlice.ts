import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./userAction";

const initialState: any = {
  data: [],
  isLoading: false,
  isSuccess: false,
  error: {},
  limit: 10,
  totalRecord: 0,
  page: 1,

};


export const userList = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {},

  extraReducers(builder) {
    
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })

      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload.data
        state.page = payload.page
        state.limit = payload.limit
        state.responseMessage = payload.responseMessage
        state.responseCode = payload.responseCode
        state.totalRecord = payload.totalRecord

      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = payload;
      })



  },
});

