import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUsers } from "./userAction";

const initialState: any = {
  data: [],
  isLoading: false,
  isSuccess: false,
  error: {},
  limit: 10,
  totalRecord: 0,
  page: 1,
  openUserDeleteModal: false,
  selectedUserId:""
};


export const userList = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {
    handleOpenUserDeleteModal: (state: any) => {
      state.openUserDeleteModal = true
    },
    handleCloseUserDeleteModal: (state: any) => {
      state.openUserDeleteModal = false
    },
    setSelectedUserId: (state: any, action) => {
      state.selectedUserId = action.payload;
    }
  },

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
        state.totalRecord = payload.totalRecord

      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })

      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.selectedUserId=payload
        state.isLoading = false;
        state.isSuccess = true;
        state.error = payload;
        state.selectedUserId = payload.data._id; 

      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = payload;
      })
  },
});

export const { handleOpenUserDeleteModal, handleCloseUserDeleteModal, setSelectedUserId } = userList.actions
