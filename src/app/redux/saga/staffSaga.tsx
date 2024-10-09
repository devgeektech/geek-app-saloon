import { call, put } from 'redux-saga/effects';

import { addStaff, deleteStaff,  getAllStaff, updateStaff, updateStaffStatus, getDefaultStaffSlots, updateLeaveStaff} from '../../services/_requests';
import { addStaffFailure, addStaffSuccess, deleteStaffFailure, deleteStaffSuccess, getDefaultStaffSlotsFailure, getDefaultStaffSlotsSuccess, getStaffListFailure, getStaffListSuccess, updateLeaveStaffFailure, updateLeaveStaffSuccess, updateStaffFailure, updateStaffStatusFailure, updateStaffStatusSuccess, updateStaffSuccess } from '../reducer/staffSlice';

function* addStaffSaga(action) {
  try {
    const response = yield call(addStaff, action.payload);
    yield put(addStaffSuccess(response.data));
  } catch (error: any) {
    yield put(addStaffFailure(error.response));
  }
}

function* deleteStaffSaga(action) {
  try {
    const response = yield call(deleteStaff, action.payload);
    yield put(deleteStaffSuccess(response.data));
  } catch (error: any ) {
    yield put(deleteStaffFailure(error.response));
  }
}

function* getStaffSaga(action) {
  try {
    const { search, skip, limit } = action.payload;
    const response = yield call(getAllStaff, search, skip, limit)
    yield put(getStaffListSuccess(response));
  } catch (error) {
    yield put(getStaffListFailure(error));
  }
}

function* getDefaultSlotsSaga(action){
  try {
    const { data } = action.payload;
    const response = yield call(getDefaultStaffSlots, data)
    yield put(getDefaultStaffSlotsSuccess(response));
  } catch (error) {
    yield put(getDefaultStaffSlotsFailure(error));
  }
}

function* updateLeaveStaffSaga(action) {
  try {
    const data = action.payload;
    const response = yield call(updateLeaveStaff, data);
    yield put(updateLeaveStaffSuccess(response.data));
  } catch (error: any) {
    yield put(updateLeaveStaffFailure(error.response));
  }
}


function* updateStaffSaga(action) {
    try {
      const values = action.payload;
      const id = action.payload.id;
      delete values.id;
      const response = yield call(updateStaff, id, values);
      yield put(updateStaffSuccess(response.data));
    } catch (error: any) {
      yield put(updateStaffFailure(error.response));
    }
  }


function* updateStaffStatusSaga(action) {
  try {
    const values = action.payload;
    const id = action.payload.id;
    delete values.id;
    const response = yield call(updateStaffStatus, id, values);
    yield put(updateStaffStatusSuccess(response.data));
  } catch (error: any) {
    yield put(updateStaffStatusFailure(error.response));
  }
}
export {addStaffSaga, getStaffSaga, deleteStaffSaga, updateStaffSaga,updateStaffStatusSaga, getDefaultSlotsSaga, updateLeaveStaffSaga};