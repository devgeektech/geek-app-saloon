import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { FETCH_LIST_FAILURE, FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS } from '../actions/serviceAction';

const serviceForm = {
  name: "",
  image: "",
  category: "",
  subcategory: "",
  gender: [],
  description: "",
  cost: "",
  hours: 0,
  minutes: 0,
  saloonId:''
};

// @ADD SERVICE ACTION CREATED
const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    initialValues: serviceForm,
    serviceList: [] as any[],
    loading: false,
    error: null,
    isModalOpen: false,
    selectedTab: 'service',
    skip: 0,
    limit: 10,
    search: '',
    totalRecord: 0
  },
  reducers: {
    setSelectedTab: (state: any, action) => {
      state.selectedTab = action.payload;
    },
    serviceRequest: (state, action) => {
      return { ...state, loading: true, error: null }
    },
    addServiceSuccess: (state, action) => {
      toast.success('Service Created Successfully')
      return {
        ...state,
        loading: false,
        error: null,
        // serviceList: [...state.serviceList, action.payload.data],
      }
    },
    addServiceFailure: (state, action) => {
      toast.error(action.payload.responseMessage)
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    },
    getServiceRequest: (state, action) => {
      switch (action.type) {
        case FETCH_LIST_REQUEST:
          return { ...state, loading: true, error: null };
        case FETCH_LIST_SUCCESS:
          return { ...state, loading: false, serviceList: action.payload, data: action.payload };
        case FETCH_LIST_FAILURE:
          return { ...state, loading: false, error: action.payload };
        default:
          return state;
      }
      // return {...state, loading: true, error: null}
    },
    getServiceSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        serviceList: action.payload.data.data,
        totalRecord: action.payload.totalRecord,
        skip: action.payload.skip,
        limit: action.payload.limit,
      }
    },
    getServiceFailure: (state, action) => {
      toast.error(action.payload.data.responseMessage)
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    },
    editServiceRequest: (state, action) => {
      return { ...state, loading: true, error: null, isModalOpen: true }
    },
    editServiceSuccess: (state, action) => {
      toast.success('Service Updated Successfully')
      return {
        ...state,
        loading: false,
        isModalOpen: false,
      }
    },
    editServiceFailure: (state, action) => {
      toast.error(action.payload.responseMessage)
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    },
    deleteServiceRequest: (state, action) => {
      return { ...state, loading: true, error: null }
    },
    deleteServiceSuccess: (state: any, action: any) => {
      const { data } = action.payload;
      toast.success(action.payload.responseMessage);
      state.showDeleteModal = false;
      state.serviceList = state.serviceList.filter(
        (el: any) => el._id !== data?._id
      );
      state.totalRecord = state.totalRecord - 1
    },
    deleteServiceFailure: (state, action) => {
      state.error = action.payload;
    },
    // setServiceForm: (state, { payload }) => {
    //   state.initialValues = payload;
    //   return;
    // },
    setServiceForm: (state, { payload }) => {
      state.initialValues = {
        ...payload,
        hours: payload?.hours || 0,
        minutes: payload?.minutes || 0,
      };
    },
    resetServiceForm: (state) => {
      state.initialValues = serviceForm;
      return;
    },
  },
})

export const {
  serviceRequest,
  addServiceSuccess,
  addServiceFailure,
  getServiceRequest,
  getServiceSuccess,
  getServiceFailure,
  editServiceRequest,
  editServiceSuccess,
  editServiceFailure,
  setSelectedTab,
  deleteServiceFailure,
  deleteServiceRequest,
  deleteServiceSuccess,
  setServiceForm,
  resetServiceForm
} = serviceSlice.actions

export const serviceReducer = serviceSlice.reducer

// 2
// @REQ FOR EDIT PRODUCT DATA SLICE

const serviceEditSlice = createSlice({
  name: 'editservice',
  initialState: {
    serviceObj: {},
    loading: false,
    error: null,
    isModalOpen: false,
  },
  reducers: {
    editServiceRequestData: (state, action) => {
      return { ...state, loading: true, error: null }
    },
    editServiceRequestDataSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        error: null,
        serviceObj: action.payload,
      }
    },
    editServiceRequestDataFailure: (state, action) => {
      toast.error(action.payload)
      return {
        ...state,
        error: action.payload,
      }
    },
  },
})

export const { editServiceRequestData, editServiceRequestDataSuccess } = serviceEditSlice.actions

export const editServiceReducer = serviceEditSlice.reducer
