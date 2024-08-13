import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  error: null,
  skip: 0,
  limit: 10,
  search: '',
  totalRecord: 0
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUserListRequest: (state, action) => {
      return {...state, loading: true, error: null} 
    },
    fetchUserListSuccess: (state, action) => {
      state.userList = action.payload.data;
      state.totalRecord = action.payload.totalRecord;
      state.skip = action.payload.skip;
      state.limit = action.payload.limit;
      state.error = null;
       
 
    },
    fetchUserListFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {fetchUserListRequest, fetchUserListSuccess, fetchUserListFailure } = userSlice.actions;
export const selectUserList = (state) => state.users.userList;
export const selectUserListError = (state) => state.users.error;

export default userSlice.reducer;
