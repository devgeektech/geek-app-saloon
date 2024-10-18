import { put } from 'redux-saga/effects'
import * as Effects from 'redux-saga/effects'
import { createSubCategory, deleteSubCategory, getSubCreateCategory, updateSubCategory } from '../../services/_requests' // Your API functions
import {
  addSubCategorySuccess,
  addSubCateogryFailure,
  deleteSubCategoryFailure,
  deleteSubCategorySuccess,
  getSubCategoryListFailure,
  getSubCategoryListSuccess,
  updateSubCategoryFailure,
  updateSubCategorySuccess,
} from '../reducer/subCategorySlice'
import { toast } from "react-toastify";
import { setRequestStatus } from '../reducer/helperSlice';

const call: any = Effects.call

function* addSubCategorySaga(action) {
  const { id, name, image, description, saloonId } = action.payload  
  try {
    const createCategoryRes = yield call(createSubCategory, id, name, image, description, saloonId)
    yield put(addSubCategorySuccess(createCategoryRes.data))
    yield put(setRequestStatus(true));
  } catch (error: any) {
    yield put(setRequestStatus(false));
    yield put(addSubCateogryFailure(error.response))
  }
}

function* updateSubCategorySaga(action) {
  const { id, categoryId, name, image , description, saloonId} = action.payload;
  try {
    const response = yield call(updateSubCategory, id, { id: categoryId, name, image, description, saloonId });
    yield put(updateSubCategorySuccess(response.data));
  } catch (error: any) {
    toast.error(error?.responseMessage || 'An error occurred');
    yield put(updateSubCategoryFailure(error.response));
  }
}
function* getSubCategorySaga(action) {
  const { search, skip, limit } = action.payload
  try {
    const res = yield call(getSubCreateCategory, search, skip, limit);
    yield put(getSubCategoryListSuccess(res.data))
  } catch (error: any) {
    yield put(getSubCategoryListFailure(error.response))
  }
}

function* deleteSubCategorySaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(deleteSubCategory, id);
    yield put(deleteSubCategorySuccess(response.data));
    yield put(setRequestStatus(true))
  } catch (error: any) {
    yield put(setRequestStatus(false))
    yield put(deleteSubCategoryFailure(error.response));
  }
}

export { addSubCategorySaga, getSubCategorySaga, updateSubCategorySaga, deleteSubCategorySaga }
