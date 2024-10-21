import { call, put } from 'redux-saga/effects';
import { addCoupon, deleteCoupon, getAllCoupon, updateCoupon, updateCouponStatus } from '../../services/_requests';
import { addCouponFailure, addCouponSuccess, deleteCouponFailure, deleteCouponSuccess, getCouponListFailure, getCouponListSuccess, updateCouponFailure, updateCouponStatusFailure, updateCouponStatusSuccess, updateCouponSuccess } from '../reducer/couponSlice';
import { setRequestStatus } from '../reducer/helperSlice';
import { setSelectedSaloon } from '../reducer/saloonSlice';

function* addCouponSaga(action) {
  try {
    const response = yield call(addCoupon, action.payload);
    yield put(addCouponSuccess(response.data));
    yield put(setRequestStatus(true));
    yield put(setSelectedSaloon([]));
  } catch (error: any) {
    yield put(addCouponFailure(error.response));
  }
}

function* deleteCouponSaga(action) {
  try {
    const response = yield call(deleteCoupon, action.payload);
    yield put(deleteCouponSuccess(response.data));
  } catch (error: any ) {
    yield put(deleteCouponFailure(error.response));
  }
}

function* getCouponSaga(action) {
  try {
    const { search, skip, limit ,status} = action.payload;
    const response = yield call(getAllCoupon, search, skip, limit,status)
    yield put(getCouponListSuccess(response));
  } catch (error) {
    yield put(getCouponListFailure(error));
  }
}


function* updateCouponSaga(action) {
    try {
      const values = action.payload;
      const id = action.payload.couponId;
      delete values.id;
      const response = yield call(updateCoupon, id, values);
      yield put(updateCouponSuccess(response.data));
      yield put(setSelectedSaloon([]));
    } catch (error: any) {
      yield put(updateCouponFailure(error.response));
    }
  }

  function* updateCouponStatusSaga(action) {
    try {
      const values = action.payload;
      const id = action.payload.id;
      delete values.id;
      const response = yield call(updateCouponStatus, id, values);
      yield put(updateCouponStatusSuccess(response.data));
    } catch (error: any) {
      yield put(updateCouponStatusFailure(error.response));
    }
  }
export {addCouponSaga, getCouponSaga, deleteCouponSaga, updateCouponSaga,updateCouponStatusSaga};