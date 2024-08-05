import { put } from 'redux-saga/effects'
import * as Effects from 'redux-saga/effects'
import {
  addCategorySuccess,
  addCateogryFailure,
  getCategoryListSuccess,
  getCategoryListFailure,
  deleteCategorySuccess,
  deleteCategoryFailure,
} from '../reducer/categorySlice'
import { createCategory, deleteCategory, getCategory } from '../../services/_requests'

const call: any = Effects.call

function* addcategorySaga(action) {
  const { name, image } = action.payload
  try {
    const createCategoryRes = yield call(createCategory, name, image)
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
  console.log("actionactionaction", action);
  try {
    const { id } = action.payload;
    const response = yield call(deleteCategory, id)
    yield put(deleteCategorySuccess(response.data))
  } catch (error: any) {
    yield put(deleteCategoryFailure(error.response))
  }
}

export { addcategorySaga, getCategorySaga, deleteCategorySaga}
