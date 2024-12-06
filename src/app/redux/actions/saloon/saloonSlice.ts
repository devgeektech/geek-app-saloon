import { createSlice } from "@reduxjs/toolkit";
import { saloon } from "./saloonAction"


const saloonForm = {
  name: "",
  description: "",
  location: "",
  latitude: "",
  longitude: ""
};
const initialState: any = {
  saloonList: [],
  initialValues: saloonForm,
  loading: false,
  error: null,
  isModalOpen: false,
  skip: 0,
  limit: 10,
  search: '',
  totalRecord: 0,
  saloonId: "",
  address: '',
  requestStatus: false,
  saloonSelectArr: [],
  selectedSaloonArr: [],
  updatedSaloonId: null,
  lat: 30.741482,
  lng: 76.768066,
  saloonModal: false,
  saloonName: '',
  token:''
};


export const saloonSlice = createSlice({
  name: "saloon",
  initialState: initialState,
  reducers: {
    setSaloonModal: (state, action) => {
      state.saloonModal = action.payload;
    },
    setSaloonId: (state, action) => {
      state.saloonId = action.payload;
    },
    setSaloonName: (state, action) => {
      state.saloonName = action.payload;
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
    setRequestStatus: (state, action) => {
      state.requestStatus = action.payload;
  },
  },

  extraReducers(builder) {

    builder
      .addCase(saloon.pending, (state) => {

        state.isLoading = true;
        state.isSuccess = false;
      })

      .addCase(saloon.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload.data
        state.page = payload.page
        state.limit = payload.limit
        state.responseMessage = payload.responseMessage
        state.responseCode = payload.responseCode
        state.totalRecord = payload.totalRecord
        state.updatedSaloonId = payload.data._id;
        state.address = payload.data?.address
        state.saloonList = payload.data;
        state.totalRecord = payload.totalRecord;
        state.skip = payload.skip;
        state.limit = payload.limit;
        state.totalRecord = payload?.totalRecord
      })
      .addCase(saloon.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = payload;
      })
  },
});

export const {
  setSaloonId, setAddress, setSaloonKeyValues, setSelectedSaloon, setUpdatedSaloonId, setSaloonModal, setSaloonName
} = saloonSlice.actions;

