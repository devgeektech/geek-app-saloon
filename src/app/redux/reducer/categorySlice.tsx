import { Action, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  categoryList: [],
  selectedCategoryId: null,
  showDeleteModal: false,
  error: null,
  loading: false,
  skip: 0,
  limit: 10,
  search: ''
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
    deleteCategoryRequest: (state, action) => {
      return { ...state, loading: true, error: null }
    },
    deleteCategorySuccess: (state, action) => {
      toast.success(action.payload.responseMessage);
      state.showDeleteModal = false;
      state.categoryList = state.categoryList.filter(
        (category: any) => category._id !== action.payload.id
      );
    },
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
    setSelectedCategoryId: (state, action) => {
      console.log(action.payload, 'action.payload')
      state.selectedCategoryId = action.payload;
    },
    clearSelectedCategoryId: (state, action) => {
      state.selectedCategoryId = null;
    },
    setDeleteModal: (state) => {
      state.showDeleteModal = true;
    },
    closeDeleteModal: (state) => {
      state.showDeleteModal = false;
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
  deleteCategoryRequest,
  setSelectedCategoryId,
  clearSelectedCategoryId,
  setDeleteModal,
  closeDeleteModal
} = categorySlice.actions;

export default categorySlice.reducer;
