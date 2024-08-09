import { put } from 'redux-saga/effects'
import * as Effects from 'redux-saga/effects'
import {
  addService,
  createSubCategory,
  deleteServiceApi,
  editServiceData,
  getAllServices,
  getSubCreateCategory,
  selectTab,
  updateService,
} from '../../services/_requests' // Your API functions
import {
  addServiceFailure,
  addServiceSuccess,
  deleteServiceSuccess,
  editServiceRequestDataSuccess,
  editServiceSuccess,
  getServiceFailure,
  getServiceSuccess,
  setSelectedTab,
} from '../reducer/serviceSlice'
import { deleteSubCategoryFailure } from '../reducer/subCategorySlice'

const call: any = Effects.call

function* selectedTabSaga(action) {
  const { payload } = action
  const res = yield call(selectTab, payload)
  setSelectedTab(res)
}

function* addServiceSaga(action) {
  try {
    const createCategoryRes = yield call(addService, action.payload)
    yield put(addServiceSuccess(createCategoryRes.data))
  } catch (error: any) {
    console.log("errrrr", error);
    yield put(addServiceFailure(error))
  }
}

function* getServiceSaga(action) {
  console.log(" action.payload",  action.payload);
  const { search, skip, limit } = action.payload;
  try {
    const res = yield call(getAllServices, search, skip, limit)
    yield put(getServiceSuccess(res.data))
  } catch (error: any) {
    yield put(getServiceFailure(error.response))
  }
}

function* editServiceSaga(action) {
  const { payload } = action
  console.log("payload", payload);
  try {
    const res = yield call(updateService, payload?._id, { ...payload })
    yield put(editServiceSuccess(res.data))
  } catch (error: any) {
    yield put(getServiceFailure(error.response))
  }
}

function* editServiceDataSaga(action) {
  try {
    const res = yield call(editServiceData, { ...action.payload })
    yield put(editServiceRequestDataSuccess({ ...res }))
  } catch (error: any) {
    yield put(getServiceFailure(error.response))
  }
}

function* deleteServiceSaga(action) {
  try {
    const { id } = action.payload;
    console.log("id", id)
    const response = yield call(deleteServiceApi, id);
    yield put(deleteServiceSuccess(response.data));
  } catch (error: any) {
    yield put(deleteSubCategoryFailure(error.response));
  }
}

export { selectedTabSaga, addServiceSaga, getServiceSaga, editServiceSaga, editServiceDataSaga, deleteServiceSaga }
