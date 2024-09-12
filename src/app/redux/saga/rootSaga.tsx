import {takeEvery, takeLatest} from 'redux-saga/effects'
import {loginSaga} from './authSaga'
import {fetchUserListSaga} from './usersSaga'
import {addcategorySaga, deleteCategorySaga, getCategorySaga, updateCategorySaga} from './categorySaga'
import {addSubCategorySaga, deleteSubCategorySaga, getSubCategorySaga, updateSubCategorySaga} from './subCategorySaga'
import {addServiceSaga, deleteServiceSaga, editServiceDataSaga, editServiceSaga, fetchDataSaga, getServiceSaga, selectedTabSaga} from './serviceSaga'
import {closeModalSaga, openModalSaga} from './modalSaga'
import { addBannerSaga, deleteBannerSaga, getBannerSaga } from './bannerSaga'
import { addSaloonSaga, editSaloonSaga, getSaloonSaga } from './saloonSaga'
import { FETCH_LIST_REQUEST } from '../actions/serviceAction'
import { addStaffSaga, deleteStaffSaga, getStaffSaga, updateStaffSaga, updateStaffStatusSaga } from './staffSaga'
import { addCouponSaga, deleteCouponSaga, getCouponSaga, updateCouponSaga, updateCouponStatusSaga } from './couponSaga'
import { addAppointmentSaga, deleteAppointmentSaga, getAppointmentSaga, updateAppointmentSaga, updateAppointmentStatusSaga } from './appointmentSaga'

function* rootSaga() {
  yield takeLatest('auth/loginRequest', loginSaga)

  // category request 
  yield takeLatest('category/addCategoryRequest', addcategorySaga)
  yield takeLatest('category/getCategoryRequest', getCategorySaga)
  yield takeLatest('category/deleteCategoryRequest', deleteCategorySaga);
  yield takeLatest('category/updateCategoryRequest', updateCategorySaga);
  
  //sub category request
  yield takeLatest('subcategory/addSubCategoryRequest', addSubCategorySaga)
  yield takeLatest('subcategory/getSubCategoryRequest', getSubCategorySaga)
  yield takeLatest('subcategory/updateSubCategoryRequest', updateSubCategorySaga)
  yield takeLatest('subcategory/deleteSubCategoryRequest', deleteSubCategorySaga)

  // Services Request
  yield takeLatest('service/setSelectedTab', selectedTabSaga)
  yield takeLatest('service/serviceRequest', addServiceSaga)
  // yield takeEvery('service/getServiceRequest', getServiceSaga)
  yield takeLatest('service/editServiceRequest', editServiceSaga)
  yield takeLatest('service/deleteServiceRequest', deleteServiceSaga)

  yield takeLatest('editservice/editServiceRequestData', editServiceDataSaga)

  // open/close modal globaly
  yield takeLatest('modal/openModalRequest', openModalSaga)
  yield takeLatest('modal/closeModalRequest', closeModalSaga)
  

  yield takeLatest('users/fetchUserListRequest', fetchUserListSaga)

  // Banner request 
  yield takeLatest('banner/addBannerRequest', addBannerSaga)
  yield takeLatest('banner/getBannerRequest', getBannerSaga)
  yield takeLatest('banner/deleteBannerRequest', deleteBannerSaga);

  //Saloon Request
  yield takeLatest('saloon/addSaloonRequest', addSaloonSaga )
  yield takeLatest('saloon/getSaloonRequest', getSaloonSaga)
  yield takeLatest('saloon/editSaloonRequest', editSaloonSaga)

  yield takeEvery(FETCH_LIST_REQUEST, fetchDataSaga);

   // Banner request 
   yield takeLatest('staff/addStaffRequest', addStaffSaga)
   yield takeLatest('staff/getStaffRequest', getStaffSaga)
   yield takeLatest('staff/deleteStaffRequest', deleteStaffSaga);
   yield takeLatest('staff/updateStaffRequest', updateStaffSaga);
   yield takeLatest('staff/updateStaffStatusRequest', updateStaffStatusSaga);

   // Coupon request

   yield takeLatest('coupon/addCouponRequest', addCouponSaga)
   yield takeLatest('coupon/getCouponRequest', getCouponSaga)
   yield takeLatest('coupon/deleteCouponRequest', deleteCouponSaga);
   yield takeLatest('coupon/updateCouponRequest', updateCouponSaga);
   yield takeLatest('coupon/updateCouponStatusRequest', updateCouponStatusSaga);



   // Appointment request

   yield takeLatest('appointment/addAppointmentRequest', addAppointmentSaga)
   yield takeLatest('appointment/getAppointmentRequest', getAppointmentSaga)
   yield takeLatest('appointment/deleteAppointmentRequest', deleteAppointmentSaga);
   yield takeLatest('appointment/updateAppointmentRequest', updateAppointmentSaga);
   yield takeLatest('appointment/updateAppointmentStatusRequest', updateAppointmentStatusSaga);

}

export default rootSaga
