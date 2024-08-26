import { put,takeEvery,select } from 'redux-saga/effects'
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
} from '../../services/_requests' 
import {
  addServiceFailure,
  addServiceSuccess,
  deleteServiceSuccess,
  editServiceFailure,
  editServiceRequestDataSuccess,
  editServiceSuccess,
  getServiceFailure,
  getServiceSuccess,
  setSelectedTab,
} from '../reducer/serviceSlice'
import { deleteSubCategoryFailure } from '../reducer/subCategorySlice'
import { FETCH_LIST_REQUEST, fetchListFailure, fetchListSuccess } from '../actions/serviceAction'

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

  const { search, skip, limit } = action.payload;
  try {
    
    const res = yield call(getAllServices, search, skip, limit)
    console.log('====>>>',res)
    yield put(getServiceSuccess(res.data))
  } catch (error: any) {
    yield put(getServiceFailure(error.response))
  }
}
function* editServiceSaga(action) {
  const { payload } = action;
  try {
    const res = yield call(updateService, payload?._id, {
      ...payload,
      hours: payload.hours,
      minutes: payload.minutes,
    });
    yield put(editServiceSuccess(res.data));
  } catch (error) {
    yield put(editServiceFailure(error));
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



// Simulate an API call


function* fetchDataSaga(action) {
  try {
    debugger
    const { skip, limit, searchUser , saloonId} = action.payload;
    console.log('payload---------???----',action.payload)

    const data = yield call(getAllServices, skip, limit, searchUser, saloonId);


    console.log('v?????????????????????????vvvvvvvvvvvv--->',data.data)
    yield put(fetchListSuccess(data));
  } catch (error:any) {
    yield put(fetchListFailure(error.message));
  }
}

export { selectedTabSaga, addServiceSaga, getServiceSaga, editServiceSaga, editServiceDataSaga, deleteServiceSaga, fetchDataSaga }



