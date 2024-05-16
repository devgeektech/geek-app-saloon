import { call, put } from "redux-saga/effects";
import {
  fetchUserListSuccess,
  fetchUserListFailure,
} from "../reducer/userSlice";
import { getUsersList } from "../../services/_requests"; // Your API functions

function* fetchUserListSaga(action) {
  try {
    const token = action.payload;
    const response = yield call(getUsersList, token);
    yield put(fetchUserListSuccess(response));
  } catch (error) {
    yield put(fetchUserListFailure(error));
  }
}

export { fetchUserListSaga };
