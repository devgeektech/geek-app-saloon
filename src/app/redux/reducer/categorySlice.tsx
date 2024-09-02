import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const categoryForm = { id: "", name: "", photo: "", description: "" }

const initialState = {
  details: categoryForm,
  categoryList: [],
  selectedCategoryId: null,
  showDeleteModal: false,
  error: null,
  loading: false,
  skip: 0,
  limit: 10,
  search: '',
  totalRecord: 0
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategoryRequest: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    addCategorySuccess: (state: any, action) => {
      toast.success(action.payload.responseMessage);
      state.loading = false;
      state.error = null;
      state.categoryList = [...state.categoryList, ...action.payload.data];
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
    deleteCategorySuccess: (state: any, action: any) => {
      const { data } = action.payload;
      toast.success(action.payload.responseMessage);
      state.showDeleteModal = false;
      state.categoryList = state.categoryList.filter(
        (category: any) => category._id !== data?._id
      );
      state.totalRecord = state.totalRecord - 1
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
    updateCategoryRequest: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    updateCategorySuccess: (state, action) => {
      toast.success(action.payload.responseMessage);
      state.loading = false;
      state.error = null;
      state.details = categoryForm;
    },
    updateCategoryFailure: (state, action) => {
      toast.error(action.payload.data.responseMessage);
      state.error = action.payload;
    },
    setSelectedCategoryId: (state, action) => {
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
    setCategoryForm: (state, { payload }) => {
      
      state.details = { ...payload };
    },
    resetCategoryForm: (state) => {
      state.details = categoryForm;
      state.selectedCategoryId = null;
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
  closeDeleteModal,
  setCategoryForm,
  resetCategoryForm,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailure
} = categorySlice.actions;

export default categorySlice.reducer;
