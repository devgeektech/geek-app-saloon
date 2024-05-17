import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUserListSuccess: (state, action) => {
      state.userList = action.payload;
      state.error = null;
    },
    fetchUserListFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { fetchUserListSuccess, fetchUserListFailure } = userSlice.actions;
export const selectUserList = (state) => state.users.userList;
export const selectUserListError = (state) => state.users.error;

export default userSlice.reducer;
