import { call, put } from 'redux-saga/effects';
import {
  addBannerSuccess,
  addBannerFailure,
  deleteBannerSuccess,
  deleteBannerFailure,
  getBannerListSuccess,
  getBannerListFailure,
} from '../reducer/bannerSlice';
import { addBanner, deleteBanner, getAdminBanners, getBanners } from '../../services/_requests';

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
    console.log("response>>>>>>>>>>", response);
    yield put(deleteBannerSuccess(response.data));
  } catch (error: any ) {
    yield put(deleteBannerFailure(error.response));
  }
}

function* getBannerSaga(action) {
  try {
    console.log("action.payload???????????/", action.payload)
    const { search, skip, limit } = action.payload;
    const response = yield call(getBanners, search, skip, limit)
    yield put(getBannerListSuccess(response));
  } catch (error) {
    yield put(getBannerListFailure(error));
  }
}

export {addBannerSaga, getBannerSaga, deleteBannerSaga};