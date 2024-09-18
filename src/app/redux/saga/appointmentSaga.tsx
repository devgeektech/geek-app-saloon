import { call, put } from 'redux-saga/effects';
import { addAppointment, deleteAppointment, getAllAppointment, updateAppointment, updateAppointmentStatus } from '../../services/_requests';
import { addAppointmentFailure, addAppointmentSuccess, deleteAppointmentFailure, deleteAppointmentSuccess, getAppointmentListFailure, getAppointmentListSuccess, updateAppointmentFailure, updateAppointmentStatusFailure, updateAppointmentStatusSuccess, updateAppointmentSuccess } from '../reducer/appointmentSlice';

function* addAppointmentSaga(action) {
  try {
    const response = yield call(addAppointment, action.payload);
    yield put(addAppointmentSuccess(response.data));
  } catch (error: any) {
    yield put(addAppointmentFailure(error.response));
  }
}

function* deleteAppointmentSaga(action) {
  try {
    const response = yield call(deleteAppointment, action.payload);
    yield put(deleteAppointmentSuccess(response.data));
  } catch (error: any ) {
    yield put(deleteAppointmentFailure(error.response));
  }
}

function* getAppointmentSaga(action) {
  try {
    const { search, skip, limit,status } = action.payload;
    const response = yield call(getAllAppointment, search, skip, limit)
    yield put(getAppointmentListSuccess(response));
  } catch (error) {
    yield put(getAppointmentListFailure(error));
  }
}


function* updateAppointmentSaga(action) {
    try {
      const values = action.payload;
      const id = action.payload.id;
      delete values.id;
      const response = yield call(updateAppointment, id, values);
      yield put(updateAppointmentSuccess(response.data));
    } catch (error: any) {
      yield put(updateAppointmentFailure(error.response));
    }
  }


function* updateAppointmentStatusSaga(action) {
  try {
    const values = action.payload;
    const id = action.payload.id;
    delete values.id;
    const response = yield call(updateAppointmentStatus, id, values);
    yield put(updateAppointmentStatusSuccess(response.data));
  } catch (error: any) {
    yield put(updateAppointmentStatusFailure(error.response));
  }
}
export {addAppointmentSaga, getAppointmentSaga, deleteAppointmentSaga, updateAppointmentSaga,updateAppointmentStatusSaga};