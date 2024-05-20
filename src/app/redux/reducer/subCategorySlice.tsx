import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  subCategoryList: [],
  error: null,
  loading: false,
  skip: 0, // initial value for skip
  limit: 10, // initial value for limit
  search:''
};

const subCategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    addSubCategoryRequest: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    addSubCategorySuccess: (state, action) => {
      toast.success("Subcategory Added Successfully");
      return {
        ...state,
        loading: false,
        error: null,
        subCategoryList: action.payload.data,
      };
    },
    addSubCateogryFailure: (state, action) => {
      toast.error(action.payload.data.responseMessage);
      state.error = action.payload;
    },
    editSubCategorySuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        category: action.payload.data,
      };
    },
    editSubCategoryFailure: (state, action) => {
      state.error = action.payload;
    },
    deleteSubCategorySuccess: (state, action) => {},
    deleteSubCategoryFailure: (state, action) => {
      state.error = action.payload;
    },
    getSubCategoryRequest: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    getSubCategoryListSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        subCategoryList: action.payload.data,
        totalRecord: action.payload.totalRecord,
      };
    },
    getSubCategoryListFailure: (state, action) => {
      toast.error(action.payload.data.responseMessage);
      state.error = action.payload;
    },
  },
});

export const {
  addSubCategoryRequest,
  addSubCategorySuccess,
  addSubCateogryFailure,
  editSubCategorySuccess,
  editSubCategoryFailure,
  deleteSubCategorySuccess,
  deleteSubCategoryFailure,
  getSubCategoryRequest,
  getSubCategoryListSuccess,
  getSubCategoryListFailure,
} = subCategorySlice.actions;

export default subCategorySlice.reducer;
