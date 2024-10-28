import { call, put } from 'redux-saga/effects';
import { addAppointment, deleteAppointment, deleteAppointmentApi, getAllAppointment, updateAppointment, updateAppointmentStatus, getAdminBookingApi,updateAdminAppointmentSlots, confirmAdminAppointmentSlots, getAppointmentAvailability } from '../../services/_requests';
import { addAppointmentFailure, addAppointmentSuccess, deleteAppointmentFailure, deleteAppointmentSuccess, getAppointmentListFailure, getAppointmentListSuccess, updateAppointmentFailure, updateAppointmentStatusFailure, updateAppointmentStatusSuccess, updateAppointmentSuccess, getAdminAppointmentSlotsSuccess, getAdminAppointmentSlotsFailure, updateAdminAppointmentSlotsSuccess, updateAdminAppointmentSlotsFailure, confirmAppointmentSlotsSuccess, confirmAdminAppointmentSlotsFailure, getAppointmentAvailabilitySuccess, getAppointmentAavailabilityFailure, } from '../reducer/appointmentSlice';

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
    const response = yield call(deleteAppointmentApi, action.payload);
    yield put(deleteAppointmentSuccess(response.data));
  } catch (error: any ) {
    yield put(deleteAppointmentFailure(error.response));
  }
}

function* getAppointmentSaga(action) {
  try {
    const { search, skip, limit,status, type } = action.payload;
    const response = yield call(getAllAppointment, search, skip, limit, type)
    yield put(getAppointmentListSuccess(response));
  } catch (error) {
    yield put(getAppointmentListFailure(error));
  }
}

function* getAdminBooking(action) {
  try {
    const { date, data } = action.payload;
    const response = yield call(getAdminBookingApi, date, data)
    yield put(getAdminAppointmentSlotsSuccess(response));
  } catch (error) {
    yield put(getAdminAppointmentSlotsFailure(error));
  }
}

function* updateAdminAppointmentSlotsSaga(action){
  try {
    const values = action.payload;
    const response = yield call(updateAdminAppointmentSlots,values);
    yield put(updateAdminAppointmentSlotsSuccess(response.data));
    debugger
    if(response.data.data){
    let obj = {
      paymentIntent: response.data.data.paymentIntentId,
      appointmentId: response.data.data._id,
      status: 'success',
      date: values.date,
      isBookedByAdmin: true,
      serviceTime: 60
    }
    yield call(confirmAdminAppointmentSlotsSaga, { payload: obj });
  }
 
  } catch (error: any) {
    yield put(updateAdminAppointmentSlotsFailure(error.response));
  }
}

function* confirmAdminAppointmentSlotsSaga(action){
  try {
    const values = action.payload;
    const response = yield call(confirmAdminAppointmentSlots,values);
    yield put(confirmAppointmentSlotsSuccess(response.data));
  } catch (error: any) {
    yield put(confirmAdminAppointmentSlotsFailure(error.response));
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
function* getAppointmentAvailabilitySaga(action) {
  try {
    const { start, end } = action.payload;
    const response = yield call(getAppointmentAvailability, start,end)
    yield put(getAppointmentAvailabilitySuccess(response));
  } catch (error) {
    yield put(getAppointmentAavailabilityFailure(error));
  }
}

export {addAppointmentSaga, getAppointmentSaga, deleteAppointmentSaga, updateAppointmentSaga,updateAppointmentStatusSaga, getAdminBooking, updateAdminAppointmentSlotsSaga, confirmAdminAppointmentSlotsSaga, getAppointmentAvailabilitySaga};