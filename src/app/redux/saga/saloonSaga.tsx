import { call, put } from 'redux-saga/effects';
import {
addSaloonSuccess,addSaloonFailure,getSaloonListSuccess,getSaloonListFailure
} from '../reducer/saloonSlice';
import {  addSaloon, editSaloon, getVendors } from '../../services/_requests';

function* addSaloonSaga(action) {
  try {
    const response = yield call(addSaloon, action.payload);
    yield put(addSaloonSuccess(response.data));
  } catch (error: any) {
    yield put(addSaloonFailure(error.response));
  }
}

function* getSaloonSaga(action) {
  try {
    const { searchUser, skip, limit, lat, lng } = action.payload;
    const response = yield call(getVendors, lat, lng, skip, limit, searchUser);
    if (response && response.data) {
      yield put(getSaloonListSuccess({ data: { data: response.data.data }, totalRecord: response.data.totalRecord, skip, limit }));
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
    return response.data;
  } catch (error: any) {
    yield put(addSaloonFailure(error.response));
  }
}

export {addSaloonSaga, getSaloonSaga,editSaloonSaga};