import { createSlice } from "@reduxjs/toolkit";
import { getServices } from "./actions";

const initialState: any = {
    data: [],
    isLoading: true,
    isSuccess: false,
};


export const services = createSlice({
    name: "interviewersDetails",
    initialState: initialState,
    reducers: {
        // resetVettedBees: (state) => {
        //   state.vettedBees = [];
        // },
    },

    extraReducers(builder) {
        builder
            .addCase(getServices.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.vettedBees = [];
            })
            .addCase(getServices.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;

                state.vettedBees = [...state.vettedBees, payload];
            })
            .addCase(getServices.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.errorMessage = payload;
            });
    },
});


