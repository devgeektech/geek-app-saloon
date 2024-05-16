import { put } from 'redux-saga/effects'
import * as Effects from "redux-saga/effects";
import { closeModalFailure, closeModalSuccess, openModalFailure, openModalSuccess } from '../reducer/modalSlice'
import { modalStatus } from '../../services/_requests';
const call: any = Effects.call;



function* openModalSaga(action) {
  try {
    const res = yield call(modalStatus, { ...action.payload });
    yield put(openModalSuccess({ ...res }));
  } catch (error: any) {
    yield put(openModalFailure(error));
  }
}

function* closeModalSaga(action) {
  try {
    const res = yield call(modalStatus, { ...action.payload });
    yield put(closeModalSuccess({ ...res }));
  } catch (error: any) {
    yield put(closeModalFailure(error));
  }
}

export { openModalSaga, closeModalSaga }
