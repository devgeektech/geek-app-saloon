import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const helperSlice = createSlice({
    name: "helper",
    initialState: {
        requestStatus:false,
        modalStatus:false,
    },
    reducers: {
        setRequestStatus: (state, action) => {
            state.requestStatus = action.payload;
        },
        setModalStatus: (state, action) => {
            state.modalStatus = action.payload;
        }
    },
});

export const {
    setRequestStatus,
    setModalStatus
} = helperSlice.actions;

