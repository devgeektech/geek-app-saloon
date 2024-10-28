import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    couponList: [],
    error: null,
    loading: false,
    skip: 0,
    limit: 10,
    search: '',
    totalRecord: 0,
    couponId: null,
    couponModalStatus:false
};

const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        setCouponId: (state, action) => {
            state.couponId = action.payload;
        },
        setCouponModal: (state, action) => {
            state.couponModalStatus = action.payload;
        },
        addCouponRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        addCouponSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;
            state.couponList = [action.payload.data, ...state.couponList];
            state.totalRecord+=1; 
        },
        addCouponFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },
        editCouponSuccess: (state: any, action) => {
            state.loading = false;
            state.couponList = state.couponList.map((coupon:any) =>
                coupon._id === action.payload.data._id ? action.payload.data : coupon
            );
        },
        editCouponFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteCouponRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        deleteCouponSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.couponList = state.couponList.filter(
                (coupon: any ) => coupon?._id !== action.payload.data._id
            );
            state.totalRecord -= 1;
            state.loading = false;
        },
        deleteCouponFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        getCouponRequest: (state, action) => {
            return { ...state, loading: true, error: null };
        },
        getCouponListSuccess: (state, action) => {
            state.loading = false;
            state.couponList = action.payload.data.data;
            state.totalRecord = action.payload.data.totalRecord;
            //   state.skip = action.payload.skip;
            //   state.limit = action.payload.limit;
        },
        getCouponListFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateCouponRequest: (state) => {
            return { ...state, loading: true, error: null };
        },
        updateCouponSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;
            state.couponList = state.couponList.map((coupon:any) =>
                coupon._id === action.payload.data._id ? action.payload.data : coupon
            );
        },
        updateCouponFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },
        updateCouponStatusRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateCouponStatusSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;
            state.couponList = state.couponList.map((coupon:any) =>
                coupon._id === action.payload.data._id ? action.payload.data : coupon
            );
        },
        updateCouponStatusFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    addCouponRequest,
    addCouponSuccess,
    addCouponFailure,
    editCouponSuccess,
    editCouponFailure,
    deleteCouponRequest,
    deleteCouponSuccess,
    deleteCouponFailure,
    getCouponRequest,
    getCouponListSuccess,
    getCouponListFailure,
    updateCouponRequest,
    updateCouponSuccess,
    updateCouponFailure,
    setCouponId,
    updateCouponStatusRequest,
    updateCouponStatusSuccess,
    updateCouponStatusFailure,
    setCouponModal
} = couponSlice.actions;

export default couponSlice.reducer;
