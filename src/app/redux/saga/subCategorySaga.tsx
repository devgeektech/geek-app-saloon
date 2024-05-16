import { put } from 'redux-saga/effects'
import * as Effects from 'redux-saga/effects'
import { createSubCategory, getSubCreateCategory } from '../../services/_requests' // Your API functions
import {
  addSubCategorySuccess,
  addSubCateogryFailure,
  getSubCategoryListFailure,
  getSubCategoryListSuccess,
} from '../reducer/subCategorySlice'

const call: any = Effects.call

function* addSubCategorySaga(action) {
  const { id, name, image } = action.payload
  try {
    const createCategoryRes = yield call(createSubCategory, id, name, image)
    yield put(addSubCategorySuccess(createCategoryRes.data))
  } catch (error: any) {
    yield put(addSubCateogryFailure(error.response))
  }
}

function* getSubCategorySaga(action) {
  const { search1, skip1, limit1 } = action.payload
  try {
    const res = yield call(getSubCreateCategory, search1, skip1, limit1);
    yield put(getSubCategoryListSuccess(res.data))
  } catch (error: any) {
    yield put(getSubCategoryListFailure(error.response))
  }
}

export { addSubCategorySaga, getSubCategorySaga }
