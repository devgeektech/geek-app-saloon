import { call, put } from 'redux-saga/effects';
import { addCoupon, deleteCoupon, getAllCoupon, updateCoupon } from '../../services/_requests';
import { addCouponFailure, addCouponSuccess, deleteCouponFailure, deleteCouponSuccess, getCouponListFailure, getCouponListSuccess, updateCouponFailure, updateCouponSuccess } from '../reducer/couponSlice';

function* addCouponSaga(action) {
  try {
    const response = yield call(addCoupon, action.payload);
    yield put(addCouponSuccess(response.data));
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
      const id = action.payload.id;
      delete values.id;
      const response = yield call(updateCoupon, id, values);
      yield put(updateCouponSuccess(response.data));
    } catch (error: any) {
      yield put(updateCouponFailure(error.response));
    }
  }
export {addCouponSaga, getCouponSaga, deleteCouponSaga, updateCouponSaga};