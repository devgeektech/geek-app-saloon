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

const call: any = Effects.call

function* addSubCategorySaga(action) {
  const { categoryId, name, image } = action.payload
  try {
    const createCategoryRes = yield call(createSubCategory, categoryId, name, image)
    yield put(addSubCategorySuccess(createCategoryRes.data))
  } catch (error: any) {
    yield put(addSubCateogryFailure(error.response))
  }
}

function* updateSubCategorySaga(action) {
  const { id, categoryId, name, image } = action.payload;
  try {
    const response = yield call(updateSubCategory, id, { id: categoryId, name, image });
    yield put(updateSubCategorySuccess(response.data));
  } catch (error: any) {
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
  } catch (error: any) {
    yield put(deleteSubCategoryFailure(error.response));
  }
}

export { addSubCategorySaga, getSubCategorySaga, updateSubCategorySaga, deleteSubCategorySaga }
