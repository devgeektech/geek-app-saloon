import { call, put } from 'redux-saga/effects';
import {
addSaloonSuccess,addSaloonFailure,getSaloonListSuccess,getSaloonListFailure,
// setSaloonId,
editSaloonSuccess,
setSaloonKeyValues,
setSaloonModal
} from '../reducer/saloonSlice';
import {  addSaloon, editSaloon, getVendors } from '../../services/_requests';
import { setRequestStatus } from '../reducer/helperSlice';
import { transformArr } from '../../utils/common';

function* addSaloonSaga(action) {
  try {
    const response = yield call(addSaloon, action.payload);
    yield put(addSaloonSuccess(response.data));
    yield put(setRequestStatus(true));
    yield put(setSaloonModal(false));
  } catch (error: any) {
    yield put(setRequestStatus(false));
    yield put(setSaloonModal(false));
    yield put(addSaloonFailure(error));
  }
}

function* getSaloonSaga(action) {  
  try {
    const { searchUser, skip, limit, lat, lng } = action.payload;
    const response = yield call(getVendors, lat, lng, skip, limit, searchUser);
    if (response && response.data) {
      // yield put(setSaloonId(response.data.data[0]?._id));
      yield put(getSaloonListSuccess({ data: { data: response.data.data }, totalRecord: response.data.totalRecord, skip, limit }));
      yield put(setRequestStatus(false));
      if(response.data.data?.length > 0){
        let arr = transformArr(response.data.data);
        yield put(setSaloonKeyValues(arr));
      }
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error:any) {
    console.error("Error: ", error);
    yield put(getSaloonListFailure(error.message || error));
  }
}

function* editSaloonSaga(action) {
  try {
    const response = yield call(editSaloon, action.payload);
    yield put(editSaloonSuccess(response.data));
    return response.data;
  } catch (error: any) {
    yield put(addSaloonFailure(error.response));
  }
}

export {addSaloonSaga, getSaloonSaga,editSaloonSaga};