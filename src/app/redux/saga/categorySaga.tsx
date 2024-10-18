import { put } from 'redux-saga/effects'
import * as Effects from 'redux-saga/effects'
import {
  addCategorySuccess,
  addCateogryFailure,
  getCategoryListSuccess,
  getCategoryListFailure,
  deleteCategorySuccess,
  deleteCategoryFailure,
  updateCategoryFailure,
  updateCategorySuccess,
} from '../reducer/categorySlice'
import { createCategory, deleteCategory, getCategory, updateCategory } from '../../services/_requests'
import { setRequestStatus } from '../reducer/helperSlice'

const call: any = Effects.call

function* addcategorySaga(action) {  
  const values = action.payload;
  delete values.id;
  if(!values.photo) delete values.photo;
  try {
    const createCategoryRes = yield call(createCategory, values)
    yield put(addCategorySuccess(createCategoryRes.data))
  } catch (error: any) {
    yield put(addCateogryFailure(error.response))
  }
}

function* getCategorySaga(action) {
  try {
    const { search, skip, limit } = action.payload;
    const createCategoryRes = yield call(getCategory, search, skip, limit)
    yield put(getCategoryListSuccess(createCategoryRes.data))
  } catch (error: any) {
    yield put(getCategoryListFailure(error.response))
  }
}

function* deleteCategorySaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(deleteCategory, id);
    yield put(deleteCategorySuccess(response.data));
    yield put(setRequestStatus(true))
  } catch (error: any) {
    yield put(setRequestStatus(false))
    yield put(deleteCategoryFailure(error.response));
  }
}

function* updateCategorySaga(action) {
  try {
    const values = action.payload;
    const id = action.payload.id;
    delete values.id;
    const response = yield call(updateCategory, id, values);
    yield put(updateCategorySuccess(response.data));
  } catch (error: any) {
    yield put(updateCategoryFailure(error.response));
  }
}
export { addcategorySaga, getCategorySaga, deleteCategorySaga, updateCategorySaga }
