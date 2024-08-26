import { call, put } from 'redux-saga/effects';
import {
addSaloonSuccess,addSaloonFailure,getSaloonListSuccess,getSaloonListFailure
} from '../reducer/saloonSlice';
import {  addSaloon, getVendors } from '../../services/_requests';

function* addSaloonSaga(action) {
  try {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^',action.payload)
    const response = yield call(addSaloon, action.payload);
    yield put(addSaloonSuccess(response.data));
  } catch (error: any) {
    yield put(addSaloonFailure(error.response));
  }
}

function* getSaloonSaga(action) {
  try {
    const { searchUser, skip, limit, lat, lng } = action.payload;
    console.log("Action Payload:-----response----->>>> ",searchUser, skip, limit, lat, lng);

    const response = yield call(getVendors, lat, lng, skip, limit, searchUser);
    console.log("API Response:---======--->>>> ", response);

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

export {addSaloonSaga, getSaloonSaga};