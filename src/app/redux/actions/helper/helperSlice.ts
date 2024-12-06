import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    requestStatus:false,
    modalStatus:false,
    token:''}
export const helperSlice = createSlice({
    name: "helper",
    initialState:initialState,
    reducers: {
        setRequestStatus: (state, action) => {
            state.requestStatus = action.payload;
        },
        setModalStatus: (state, action) => {
            state.modalStatus = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    },
});

export const {
    setRequestStatus,
    setModalStatus,
    setToken
} = helperSlice.actions;

