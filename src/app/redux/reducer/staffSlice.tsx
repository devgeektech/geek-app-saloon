import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    staffList: [],
    error: null,
    loading: false,
    skip: 0,
    limit: 10,
    search: '',
    totalRecord: 0,
    staffId: null
};

const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        setStaffId: (state, action) => {
            state.staffId = action.payload;
        },
        addStaffRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        addStaffSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;            
            state.staffList = [...state.staffList, action.payload.data?.staff];
            state.totalRecord+=1; 
        },
        addStaffFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },
        editStaffSuccess: (state: any, action) => {
            state.loading = false;
            state.staffList = state.staffList.map((staff:any) =>
                staff._id === action.payload.data._id ? action.payload.data : staff
            );
        },
        editStaffFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteStaffRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        deleteStaffSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.staffList = state.staffList.filter(
                (staff: any ) => staff._id !== action.payload.data._id
            );
            state.totalRecord -= 1;
            state.loading = false;
        },
        deleteStaffFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        getStaffRequest: (state, action) => {
            return { ...state, loading: true, error: null };
        },
        getStaffListSuccess: (state, action) => {
            state.loading = false;
            state.staffList = action.payload.data.data;
            state.totalRecord = action.payload.data.totalRecord;
            //   state.skip = action.payload.skip;
            //   state.limit = action.payload.limit;
        },
        getStaffListFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateStaffRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateStaffSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;
            state.staffList = state.staffList.map((staff:any) =>
                staff._id === action.payload.data._id ? action.payload.data : staff
            );
        },
        updateStaffFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },


        updateStaffStatusRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateStaffStatusSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;
            state.staffList = state.staffList.map((staff:any) =>
                staff._id === action.payload.data._id ? action.payload.data : staff
            );
        },
        updateStaffStatusFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    addStaffRequest,
    addStaffSuccess,
    addStaffFailure,
    editStaffSuccess,
    editStaffFailure,
    deleteStaffRequest,
    deleteStaffSuccess,
    deleteStaffFailure,
    getStaffRequest,
    getStaffListSuccess,
    getStaffListFailure,
    updateStaffRequest,
    updateStaffSuccess,
    updateStaffFailure,
    updateStaffStatusRequest,
    updateStaffStatusSuccess,
    updateStaffStatusFailure,
    setStaffId
} = staffSlice.actions;

export default staffSlice.reducer;
