import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  error: null,
  loading: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalRequest: (state) => {
      state.isOpen = true;
      return;
    },
    openModalSuccess: (state, action) => {
      return {
        ...state,
        isOpen: true,
        loading: false
      };
    },
    openModalFailure: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    closeModalRequest: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    closeModalSuccess: (state, action) => {
      return {
        ...state,
        isOpen: false,
        loading: false
      };
    },
    closeModalFailure: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const { openModalRequest, openModalSuccess, openModalFailure, closeModalRequest, closeModalSuccess, closeModalFailure } =
  modalSlice.actions;

export default modalSlice.reducer;
