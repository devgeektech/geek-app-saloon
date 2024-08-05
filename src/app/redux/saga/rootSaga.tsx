import {takeLatest} from 'redux-saga/effects'
import {loginSaga} from './authSaga'
import {fetchUserListSaga} from './usersSaga'
import {addcategorySaga, deleteCategorySaga, getCategorySaga} from './categorySaga'
import {addSubCategorySaga, getSubCategorySaga} from './subCategorySaga'
import {addServiceSaga, editServiceDataSaga, editServiceSaga, getServiceSaga, selectedTabSaga} from './serviceSaga'
import {closeModalSaga, openModalSaga} from './modalSaga'

function* rootSaga() {
  yield takeLatest('auth/loginRequest', loginSaga)
  yield takeLatest('category/addCategoryRequest', addcategorySaga)
  yield takeLatest('category/getCategoryRequest', getCategorySaga)
  yield takeLatest('category/deleteCategoryRequest', deleteCategorySaga)

  //Category request
  yield takeLatest('subcategory/addSubCategoryRequest', addSubCategorySaga)
  yield takeLatest('subcategory/getSubCategoryRequest', getSubCategorySaga)
  // Services Request
  yield takeLatest('service/setSelectedTab', selectedTabSaga)
  yield takeLatest('service/serviceRequest', addServiceSaga)
  yield takeLatest('service/getServiceRequest', getServiceSaga)
  yield takeLatest('service/editServiceRequest', editServiceSaga)

  yield takeLatest('editservice/editServiceRequestData', editServiceDataSaga)

  // open/close modal globaly
  yield takeLatest('modal/openModalRequest', openModalSaga)
  yield takeLatest('modal/closeModalRequest', closeModalSaga)

  yield takeLatest('users/fetchUserListRequest', fetchUserListSaga)
}

export default rootSaga
