import { combineReducers } from 'redux'
import authReducer from './authSlice'
import userReducer from './userSlice'
import categoryReducer from './categorySlice'
import subCategoryReducer from './subCategorySlice'
import { editServiceReducer, serviceReducer } from './serviceSlice'
import modalReducer from './modalSlice'
import bannerReducer from './bannerSlice'
import saloonReducer from './saloonSlice'
import saloonServiceReducer from './serviceReducer'
import { services } from '../services/serviceSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  category: categoryReducer,
  banner: bannerReducer,
  subcategory: subCategoryReducer,
  service: serviceReducer,
  editServiceData: editServiceReducer,
  modal: modalReducer,
  saloon: saloonReducer,
  saloonService:saloonServiceReducer,
  serviceSlice: services.reducer,
})
