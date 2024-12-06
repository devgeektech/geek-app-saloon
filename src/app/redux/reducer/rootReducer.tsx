import { combineReducers } from 'redux'
// import authReducer from './authSlice'
import userReducer from './userSlice'
import categoryReducer from './categorySlice'
import subCategoryReducer from './subCategorySlice'
import { editServiceReducer, serviceReducer } from './serviceSlice'
import modalReducer from './modalSlice'
import bannerReducer from './bannerSlice'
import saloonServiceReducer from './serviceReducer'
import { services } from '../services/serviceSlice'
// import { saloonSlice } from './saloonSlice'
import staffReducer from './staffSlice';
import couponReducer from './couponSlice';
import appointmentReducer from './appointmentSlice';
import { helperSlice } from '../actions/helper/helperSlice'
import { userList } from '../actions/user/userSlice'
import { login } from '../actions/auth/authSlice'
import { saloonSlice } from '../actions/saloon/saloonSlice'
// import { saloonSlice } from '../actions/saloon/saloonSlice'

export const rootReducer = combineReducers({
  userList: userList.reducer,
  login:login.reducer,
  saloon:saloonSlice.reducer,
  // auth:auth.reducer,
  // auth: authReducer,
  // users: userReducer,
  category: categoryReducer,
  banner: bannerReducer,
  subcategory: subCategoryReducer,
  service: serviceReducer,
  editServiceData: editServiceReducer,
  modal: modalReducer,
  // saloon: saloonSlice.reducer,
  saloonService: saloonServiceReducer,
  serviceSlice: services.reducer,
  staff:  staffReducer,
  coupon: couponReducer,
  appointment: appointmentReducer,
  helper: helperSlice.reducer

})
