import { call, put } from "redux-saga/effects";
import {
  fetchUserListSuccess,
  fetchUserListFailure,
} from "../reducer/userSlice";
import { getUsersList } from "../../services/_requests";

function* fetchUserListSaga(action) {
  try { 
    console.log('???????????????/');
    
    const { search, skip, limit } = action.payload;
    const response = yield call(getUsersList,search,skip,limit);
    console.log('RESPOSE:::::',response)
    yield put(fetchUserListSuccess(response.data));
  } catch (error) {
    yield put(fetchUserListFailure(error));

  }
   
}

export { fetchUserListSaga };
