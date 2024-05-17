import { put } from "redux-saga/effects";
import * as Effects from "redux-saga/effects";
import { loginSuccess, loginFailure } from "../reducer/authSlice";
import { adminLogin } from "../../services/_requests"; // Your API functions

const call: any = Effects.call;

function* loginSaga(action) {
  const { email, password } = action.payload;

  try {
    const response = yield call(adminLogin, email,password);
    yield put(loginSuccess(response.data));
  } catch (error: any) {
    yield put(loginFailure(error.response));
  }
}

export { loginSaga };