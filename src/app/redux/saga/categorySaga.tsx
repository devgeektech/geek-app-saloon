import {put} from 'redux-saga/effects'
import * as Effects from 'redux-saga/effects'
import {
  addCategorySuccess,
  addCateogryFailure,
  getCategoryListSuccess,
  getCategoryListFailure,
} from '../reducer/categorySlice'
import {createCategory, getCategory} from '../../services/_requests' // Your API functions

const call: any = Effects.call

function* addcategorySaga(action) {
  const {name, image} = action.payload
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

    const createCategoryRes = yield call(getCategory,search, skip, limit)
    yield put(getCategoryListSuccess(createCategoryRes.data))
  } catch (error: any) {
    yield put(getCategoryListFailure(error.response))
  }
}

export {addcategorySaga, getCategorySaga}
