import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const subCategoryForm = { name: "", image: "", categoryId: "", description: '' }

const initialState = {
  initialValues: subCategoryForm,
  subCategoryList: [],
  error: null,
  loading: false,
  skip: 0,
  limit: 10,
  search: '',
  showDeleteModal: false,
  selectedId: null,
  totalRecord: 0
};

const subCategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    addSubCategoryRequest: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    addSubCategorySuccess: (state: any, action) => {
      toast.success("Subcategory Added Successfully");
      state.loading = false;
      state.error = null;
      state.subCategoryList = [...state.subCategoryList, ...action.payload.data]
    },
    addSubCateogryFailure: (state, action) => {
      toast.error(action.payload.data?.responseMessage);
      state.error = action.payload;
    },
    updateSubCategoryRequest: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    updateSubCategorySuccess: (state, action) => {
      toast.success('Subcategory Updated Successfully');
      state.initialValues = subCategoryForm;
    },
    updateSubCategoryFailure: (state, action) => {
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
    deleteSubCategoryRequest: (state, action) => {
      return { ...state, loading: true, error: null }
    },
    deleteSubCategorySuccess: (state: any, action: any) => {
      const { data } = action.payload;
      toast.success(action.payload.responseMessage);
      state.showDeleteModal = false;
      state.subCategoryList = state.subCategoryList.filter(
        (el: any) => el._id !== data?._id
      );
      state.totalRecord = state.totalRecord - 1
    },
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
    setSubCategoryForm: (state, { payload }) => {
      state.initialValues = payload;
      return;
    },
    resetSubCategoryForm: (state) => {
      state.initialValues = subCategoryForm;
      state.selectedId = null;
      return;
    },
    setDeleteModal: (state) => {
      state.showDeleteModal = true;
    },
    closeDeleteModal: (state) => {
      state.showDeleteModal = false;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const {
  addSubCategoryRequest,
  addSubCategorySuccess,
  addSubCateogryFailure,
  editSubCategorySuccess,
  editSubCategoryFailure,
  getSubCategoryRequest,
  getSubCategoryListSuccess,
  getSubCategoryListFailure,
  updateSubCategoryFailure,
  updateSubCategoryRequest,
  updateSubCategorySuccess,
  deleteSubCategoryRequest,
  deleteSubCategorySuccess,
  deleteSubCategoryFailure,
  resetSubCategoryForm,
  setSubCategoryForm,
  setDeleteModal,
  closeDeleteModal,
  setSelectedId,

} = subCategorySlice.actions;

export default subCategorySlice.reducer;
