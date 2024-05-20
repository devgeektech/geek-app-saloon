import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  categoryList: [],
  error: null,
  loading: false,
  skip: 0, // initial value for skip
  limit: 10, // initial value for limit
  search:''
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategoryRequest: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    addCategorySuccess: (state, action) => {
      toast.success(action.payload.responseMessage);
      return {
        ...state,
        loading: false,
        error: null,
        categoryList: action.payload.data,
      };
    },
    addCateogryFailure: (state, action) => {
      toast.error(action.payload.data.responseMessage);
      state.error = action.payload;
    },
    editCategorySuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        category: action.payload.data,
      };
    },
    editCategoryFailure: (state, action) => {
      state.error = action.payload;
    },
    deleteCategorySuccess: (state, action) => { },
    deleteCategoryFailure: (state, action) => {
      state.error = action.payload;
    },
    getCategoryRequest: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    getCategoryListSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        categoryList: action.payload.data,
        totalRecord: action.payload.totalRecord,
        skip: action.payload.skip,
        limit: action.payload.limit,
      };
    },
    getCategoryListFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addCategoryRequest,
  addCategorySuccess,
  addCateogryFailure,
  editCategorySuccess,
  editCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryFailure,
  getCategoryRequest,
  getCategoryListSuccess,
  getCategoryListFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
