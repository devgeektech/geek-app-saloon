import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const helperSlice = createSlice({
    name: "helper",
    initialState: {
        requestStatus:false
    },
    reducers: {
        setRequestStatus: (state, action) => {
            state.requestStatus = action.payload;
        }
    },
});

export const {
    setRequestStatus
} = helperSlice.actions;

