import {put} from 'redux-saga/effects'
import * as Effects from 'redux-saga/effects'
import {
  addService,
  createSubCategory,
  editService,
  editServiceData,
  getAllServices,
  getSubCreateCategory,
} from '../../services/_requests' // Your API functions
import {
  addServiceFailure,
  addServiceSuccess,
  editServiceRequestDataSuccess,
  editServiceSuccess,
  getServiceFailure,
  getServiceSuccess,
} from '../reducer/serviceSlice'

const call: any = Effects.call

function* addServiceSaga(action) {
  try {
    const createCategoryRes = yield call(addService, action.payload)
    yield put(addServiceSuccess(createCategoryRes.data))
  } catch (error: any) {
    yield put(addServiceFailure(error.response))
  }
}

function* getServiceSaga(action) {
  const { search2, skip2, limit2 } = action.payload;
  try {
    const res = yield call(getAllServices, search2, skip2, limit2)
    yield put(getServiceSuccess(res.data))
  } catch (error: any) {
    yield put(getServiceFailure(error.response))
  }
}

function* editServiceSaga(action) {
  const {payload} = action

  try {
    const res = yield call(editService, {...payload})
    // yield put(editServiceSuccess(res.data))
  } catch (error: any) {
    // yield put(getServiceFailure(error.response))
  }
}

function* editServiceDataSaga(action) {
  try {
    const res = yield call(editServiceData, {...action.payload})
    yield put(editServiceRequestDataSuccess({...res}))
  } catch (error: any) {
    yield put(getServiceFailure(error.response))
  }
}

export {addServiceSaga, getServiceSaga, editServiceSaga, editServiceDataSaga}
