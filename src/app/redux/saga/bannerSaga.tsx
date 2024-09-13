import { call, put } from 'redux-saga/effects';
import {
  addBannerSuccess,
  addBannerFailure,
  deleteBannerSuccess,
  deleteBannerFailure,
  getBannerListSuccess,
  getBannerListFailure,
  updateBannerSuccess,
  updateBannerFailure,
} from '../reducer/bannerSlice';
import { addBanner, deleteBanner, getAdminBanners, getBanners, updateBanner } from '../../services/_requests';

function* addBannerSaga(action) {
  try {
    const response = yield call(addBanner, action.payload);
    yield put(addBannerSuccess(response.data));
  } catch (error: any) {
    yield put(addBannerFailure(error.response));
  }
}

function* deleteBannerSaga(action) {
  try {
    const response = yield call(deleteBanner, action.payload);
    yield put(deleteBannerSuccess(response.data));
  } catch (error: any ) {
    yield put(deleteBannerFailure(error.response));
  }
}

function* getBannerSaga(action) {
  try {
    const { search, skip, limit } = action.payload;
    const response = yield call(getBanners, search, skip, limit)
    yield put(getBannerListSuccess(response));
  } catch (error) {
    yield put(getBannerListFailure(error));
  }
}

function* updateBannerSaga(action) {
  try {
    const values = action.payload;
    const id = action.payload.id;
    delete values.id;
    const response = yield call(updateBanner, id, values);
    yield put(updateBannerSuccess(response.data));
  } catch (error: any) {
    yield put(updateBannerFailure(error.response));
  }
}


export {addBannerSaga, getBannerSaga, deleteBannerSaga, updateBannerSaga};