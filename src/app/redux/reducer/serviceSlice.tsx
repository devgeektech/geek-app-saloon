import {createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'

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
};

// @ADD SERVICE ACTION CREATED
const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    initialValues: serviceForm,
    serviceList: [],
    loading: false,
    error: null,
    isModalOpen: false,
    selectedTab: 'service', // default tab
    skip: 0, // initial value for skip
    limit: 10, // initial value for limit
    search:'',
    totalRecord : 0

  },
  reducers: {
    setSelectedTab: (state:any, action) => {
      state.selectedTab = action.payload;
    },
    serviceRequest: (state, action) => {
      return {...state, loading: true, error: null}
    },
    addServiceSuccess: (state, action) => {
      toast.success('Service Created Successfully')
      return {
        ...state,
        loading: false,
        error: null,
        serviceList: action.payload.data,
      }
    },
    addServiceFailure: (state, action) => {
      console.log("action.payloa11111111111111d", action.payload)
      toast.error(action.payload.responseMessage)
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    },
    getServiceRequest: (state, action) => {
      return {...state, loading: true, error: null}
    },
    getServiceSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        serviceList: action.payload.data,
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
      return {...state, loading: true, error: null, isModalOpen: true}
    },
    editServiceSuccess: (state, action) => {
      toast.success('Service Updated Successfully')
      return {
        ...state,
        loading: false,
        isModalOpen: false,
        // serviceList: action.payload.data,
      }
    },
    editServiceFailure: (state, action) => {
      console.log("action.payload.data", action.payload);
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
      state.totalRecord =  state.totalRecord - 1
    },
    deleteServiceFailure: (state, action) => {
      state.error = action.payload;
    },
    setServiceForm: (state, { payload }) => {
      state.initialValues = payload;
      return;
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
      return {...state, loading: true, error: null}
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

export const {editServiceRequestData, editServiceRequestDataSuccess} = serviceEditSlice.actions

export const editServiceReducer = serviceEditSlice.reducer
