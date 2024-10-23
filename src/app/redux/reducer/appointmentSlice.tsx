import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    appointmentList: [],
    adminSlotsList: [],
    error: null,
    loading: false,
    skip: 0,
    limit: 10,
    search: '',
    totalRecord: 0,
    appointmentId: null
};

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        setAppointmentId: (state, action) => {
            state.appointmentId = action.payload;
        },
        addAppointmentRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        addAppointmentSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;            
            state.appointmentList = [...state.appointmentList, action.payload.data?.appointment];
            state.totalRecord+=1; 
        },
        addAppointmentFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },
        editAppointmentSuccess: (state: any, action) => {
            state.loading = false;
            state.appointmentList = state.appointmentList.map((appointment:any) =>
                appointment._id === action.payload.data._id ? action.payload.data : appointment
            );
        },
        editAppointmentFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteAppointmentRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        deleteAppointmentSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            // state.appointmentList = state.appointmentList.filter(
            //     (appointment: any ) => appointment._id !== action.payload.data._id
            // );
            // state.totalRecord -= 1;
            state.loading = false;
        },
        deleteAppointmentFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        getAppointmentRequest: (state, action) => {
            return { ...state, loading: true, error: null };
        },
        getAppointmentListSuccess: (state, action) => {
            state.loading = false;
            state.appointmentList = action.payload.data.data;
            state.totalRecord = action.payload.data.totalRecord;
            //   state.skip = action.payload.skip;
            //   state.limit = action.payload.limit;
        },
        getAppointmentListFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        getAdminAppointmentSlots: (state, action) => {
            return { ...state, loading: true, error: null };
        },
        getAdminAppointmentSlotsSuccess: (state, action) => {
            state.loading = false;
            state.adminSlotsList = action.payload.data.data;
        },
        getAdminAppointmentSlotsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateAdminAppointmentSlotsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateAdminAppointmentSlotsSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;
        },
        updateAdminAppointmentSlotsFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },
        confirmAdminAppointmentSlotsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        confirmAppointmentSlotsSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;
        },
        confirmAdminAppointmentSlotsFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },
        updateAppointmentRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateAppointmentSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;
            state.appointmentList = state.appointmentList.map((appointment:any) =>
                appointment._id === action.payload.data._id ? action.payload.data : appointment
            );
        },
        updateAppointmentFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },


        updateAppointmentStatusRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateAppointmentStatusSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;
            state.appointmentList = state.appointmentList.map((appointment:any) =>
                appointment._id === action.payload.data._id ? action.payload.data : appointment
            );
        },
        updateAppointmentStatusFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    addAppointmentRequest,
    addAppointmentSuccess,
    addAppointmentFailure,
    editAppointmentSuccess,
    editAppointmentFailure,
    deleteAppointmentRequest,
    deleteAppointmentSuccess,
    deleteAppointmentFailure,
    getAppointmentRequest,
    getAppointmentListSuccess,
    getAppointmentListFailure,
    updateAppointmentRequest,
    updateAppointmentSuccess,
    updateAppointmentFailure,
    updateAppointmentStatusRequest,
    updateAppointmentStatusSuccess,
    updateAppointmentStatusFailure,
    setAppointmentId,
    getAdminAppointmentSlots,
    getAdminAppointmentSlotsSuccess,
    getAdminAppointmentSlotsFailure,
    updateAdminAppointmentSlotsSuccess,
    updateAdminAppointmentSlotsRequest,
    updateAdminAppointmentSlotsFailure,
    confirmAppointmentSlotsSuccess,
    confirmAdminAppointmentSlotsFailure
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
