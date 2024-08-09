import { combineReducers } from 'redux'
import authReducer from './authSlice'
import userReducer from './userSlice'
import categoryReducer from './categorySlice'
import subCategoryReducer from './subCategorySlice'
import { editServiceReducer, serviceReducer } from './serviceSlice'
import modalReducer from './modalSlice'
import bannerReducer from './bannerSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  category: categoryReducer,
  banner: bannerReducer,
  subcategory: subCategoryReducer,
  service: serviceReducer,
  editServiceData: editServiceReducer,
  modal: modalReducer,
})
