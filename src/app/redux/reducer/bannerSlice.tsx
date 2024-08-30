import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    bannerList: [],
    error: null,
    loading: false,
    skip: 0,
    limit: 10,
    search: '',
    totalRecord: 0,
    bannerId: null
};

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {
        setBannerId: (state, action) => {
            state.bannerId = action.payload;
        },
        addBannerRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        addBannerSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;
            state.bannerList = [...state.bannerList,    action.payload.data];
        },
        addBannerFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },
        editBannerSuccess: (state: any, action) => {
            state.loading = false;
            state.bannerList = state.bannerList.map(banner =>
                banner._id === action.payload.data._id ? action.payload.data : banner
            );
        },
        editBannerFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteBannerRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        deleteBannerSuccess: (state: any, action) => {
            console.log("action.payload", action.payload);
            toast.success(action.payload.responseMessage);
            state.bannerList = state.bannerList.filter(
                (banner: any ) => banner._id !== action.payload.data._id
            );
            state.totalRecord -= 1;
            state.loading = false;
        },
        deleteBannerFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        getBannerRequest: (state, action) => {
            return { ...state, loading: true, error: null };
        },
        getBannerListSuccess: (state, action) => {
            state.loading = false;
            state.bannerList = action.payload.data.data;
            state.totalRecord = action.payload.data.totalRecord;
            //   state.skip = action.payload.skip;
            //   state.limit = action.payload.limit;
        },
        getBannerListFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateBannerRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateBannerSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;
            state.bannerList = state.bannerList.map(banner =>
                banner._id === action.payload.data._id ? action.payload.data : banner
            );
        },
        updateBannerFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    addBannerRequest,
    addBannerSuccess,
    addBannerFailure,
    editBannerSuccess,
    editBannerFailure,
    deleteBannerRequest,
    deleteBannerSuccess,
    deleteBannerFailure,
    getBannerRequest,
    getBannerListSuccess,
    getBannerListFailure,
    updateBannerRequest,
    updateBannerSuccess,
    updateBannerFailure,
    setBannerId
} = bannerSlice.actions;

export default bannerSlice.reducer;
