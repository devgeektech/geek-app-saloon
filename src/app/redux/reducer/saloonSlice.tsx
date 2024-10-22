import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const saloonForm = {
    name: "",
    description: "",
    location: "",
    latitude: "",
    longitude: ""
};
export const saloonSlice = createSlice({
    name: "saloon",
    initialState: {
        initialValues: saloonForm,
        saloonList: [],
        loading: false,
        error: null,
        isModalOpen: false,
        skip: 0,
        limit: 10,
        search: '',
        totalRecord: 0,
        saloonId: null,
        address:'',
        requestStatus:false,
        saloonSelectArr : [],
        selectedSaloonArr:[],
        updatedSaloonId: null,
    },
    reducers: {
        setSaloonId: (state, action) => {
            state.saloonId = action.payload;
        },
        setUpdatedSaloonId: (state, action) => {
            state.updatedSaloonId = action.payload;
        },
        setSaloonKeyValues: (state, action) => {
            state.saloonSelectArr = action.payload;
        },
        setSelectedSaloon: (state: any, action) => {
            state.selectedSaloonArr = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        addSaloonRequest: (state, action) => {
            return { ...state, loading: true, error: null };
        },
        addSaloonSuccess: (state: any, action) => {
            toast.success(action.payload?.responseMessage);
            state.loading = false;
            state.error = null;
            console.log(action.payload)
            state.saloonList = [action.payload.data,...state.saloonList];
        },
        addSaloonFailure: (state, action) => {
            toast.error(action.payload?.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },

        editSaloonRequest: (state, action) => {
            return { ...state, loading: true, error: null }
        },
        editSaloonSuccess: (state: any, action) => {
            console.log(action.payload)
            const index= state.saloonList.findIndex((s:any)=>s?._id===action.payload?.data?._id);
            if(index>-1) state.saloonList.splice(index,1,action.payload.data);
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;
        },
        editSaloonFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },        

        getSaloonRequest: (state, action) => {
            return { ...state, loading: true, error: null };
        },

        getSaloonListSuccess: (state, action) => {
            state.loading = false;
            state.saloonList = action.payload.data.data;
            state.totalRecord = action.payload.totalRecord;
            state.skip = action.payload.skip;
            state.limit = action.payload.limit;
            state.totalRecord = action.payload?.totalRecord 
        },

        getSaloonListFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }

    },
});


export const selectServiceSlice = createSlice({
    name: 'select',
    initialState: {
        selectedId: null,
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedId: (state, action) => {
            state.selectedId = action.payload;
        },
        fetchDataRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});


export const {
    addSaloonFailure, addSaloonRequest, addSaloonSuccess, getSaloonRequest, getSaloonListSuccess, getSaloonListFailure, setSaloonId, editSaloonRequest, editSaloonFailure, editSaloonSuccess, setAddress,setSaloonKeyValues,setSelectedSaloon,setUpdatedSaloonId
} = saloonSlice.actions;


export const {
    setSelectedId,
    fetchDataRequest,
    fetchDataSuccess,
    fetchDataFailure,
} = selectServiceSlice.actions;

