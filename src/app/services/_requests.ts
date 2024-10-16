import axios from 'axios'
import { AuthModel, UserModel, CategoryModel } from './_models'
import { setSelectedTab } from '../redux/reducer/serviceSlice'
const API_URL = process.env.REACT_APP_API_URL
const APPOINTMNET_API_URL = process.env.REACT_APPOINTMENT_APP_API_URL
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/verify_token`
export const LOGIN_URL = `${API_URL}/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgotPassword`
export const ADMIN_LOGIN_URL = `${API_URL}/auth/admin/login`
export const CATEGORY_URL = `${API_URL}/category`
export const SUB_CATEGORY_URL = `${API_URL}/subcategory`
export const GET_VENDORS = `${API_URL}/vendor/getNearbyVendorList`
export const ADD_SALOON = `${API_URL}/vendor`
export const DELETE_VENDOR = `${API_URL}/vendor`
export const GET_USERS = `${API_URL}/users`
export const DELETE_USER = `${API_URL}/users`
export const BANNER = `${API_URL}/banner`;
export const SERVICE_URL = `${API_URL}/product`;
export const FILE_UPLOAD = `${API_URL}/product/upload`;
export const GET_ALL_PRODUCT = `${API_URL}/product`;
export const GET_ALL_ADMIN_BANNERS = `${API_URL}/banner/admin`;
export const GET_ALL_ADMIN_SERVICES = `${API_URL}/product/admin`;
export const GET_SALOON = `${API_URL}/vendor`;
export const Edit_SALOON = `${API_URL}/vendor`;
export const DELETE_SERVICE = `${API_URL}/product`;
export const DELETE_BANNER = `${API_URL}/banner`;
export const STAFF = `${API_URL}/staff`;
export const STAFFAPPOINTMENT = `http://122.180.29.167:3002/appointment/api/v1/staff`
export const STAFFStatus = `${API_URL}/staff/status`;
export const STAFFLEAVE = `http://122.180.29.167:3002/appointment/api/v1/booking/admin/updateStaffLeaves`
export const COUPON = `${API_URL}/coupon`;
export const COUPONSTATUS = `${API_URL}/coupon/status`;
export const APPOINTMENT = `${API_URL}/booking`;
export const BOOKING = `${API_URL}/booking`;
export const DEFAULTSLOTS = `${API_URL}/booking/admin/getDefaultSlots`

// Server should return AuthModel
export function login(email: any, password: any) {
  return axios.post(LOGIN_URL, {
    email,
    password,
  })
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}

export function adminLogin(email: any, password: any) {
  return axios.post(ADMIN_LOGIN_URL, {
    email,
    password,
  })
}

// *************************CATEGORY API LIST ************************

export function createCategory(values: any) {
  return axios.post(CATEGORY_URL, values)
}

export function getCategory(search: string, skip: number, limit: number) {
  return axios.get(CATEGORY_URL + `?search=${search || ""}&skip=${skip || 0}&limit=${limit || 10}`, {})
}

export function deleteCategory(id: string) {
  return axios.delete(CATEGORY_URL + `/${id}`, {})
}

export function updateCategory(id: string, payload) {
  return axios.put(CATEGORY_URL + `/${id}`, payload)
}

export function createSubCategory(id: string, name: string, image: string, description: string, saloonId: string) {
  return axios.post(SUB_CATEGORY_URL, { id, name, image, description, saloonId })
}

export function getSubCreateCategory(search: string, skip: number, limit: number) {
  return axios.get(SUB_CATEGORY_URL + `?search=${search}&skip=${skip}&limit=${limit}`)
}

export function updateSubCategory(id: string, values: any) {
  return axios.put(SUB_CATEGORY_URL + `/${id}`, values)
}

export function deleteSubCategory(id: string) {
  return axios.delete(SUB_CATEGORY_URL + `/${id}`, {})
}

// ************************** SERVICES API ************************

export function addService(body: any) {
  return axios.post(SERVICE_URL, body)
}

export function getAllServices(search: string, skip: number, limit: number) {
  return axios.get(GET_ALL_PRODUCT + `?search=${search || ''}&skip=${skip}&limit=${limit}`)
}

export function updateService(id: string, values: any) {
  return axios.put(SERVICE_URL + `/${id}`, values)
}

export function editServiceData(body: any) {
  return body
}

export function deleteServiceApi(id: string) {
  return axios.delete(SERVICE_URL + `/${id}`, {})
}


// *************************Modal API ************************
export function modalStatus(value) {
  return value
}

export function getVendors(lat: any, long: any, skip: any, limit: any, search: any) {
  return axios.get(GET_VENDORS + `?lat=${lat}&long=${long}&skip=${skip}&limit=${limit}&search=${search}`, {})
}


export function addSaloon(body: any) {
  return axios.post(ADD_SALOON, body)
}

export function getUsersList(search: string, skip: number, limit: number) {
  return axios.get(GET_USERS + `?search=${search}&skip=${skip}&limit=${limit}`, {})
}

export function deleteUserApi(id: string) {
  return axios.delete(DELETE_USER + `/${id}`, {})
}

export function addBanner(body: any) {
  return axios.post(BANNER, body)
}

export function getBanners(search: string, skip: number, limit: number) {
  return axios.get(BANNER + `?search=${search}&skip=${skip}&limit=${limit}`, {})
}
export function getAdminBanners(search: string, skip: number, limit: number) {
  return axios.get(GET_ALL_ADMIN_BANNERS + `?search=${search}&skip=${skip}&limit=${limit}`, {})
}
export function getBanner(id) {
  return axios.get(BANNER + `/${id}`)
}
export function deleteBanner(id) {
  return axios.delete(BANNER + `/${id}`)
}

export function updateBanner(id: string, payload) {
  return axios.put(BANNER + `/${id}`, payload)
}

export function commonFileUpload(file: any) {
  return axios.post(FILE_UPLOAD, file)
}

export function selectTab(tab) {
  return {
    type: setSelectedTab.type,
    payload: tab,
  };
}

export function deleteVender(id: string) {
  return axios.delete(DELETE_VENDOR + `/${id}`, {})
}

export function getSaloonById(id: string) {
  return axios.get(GET_SALOON+`/${id}`, {})
}

export function editSaloon(body: any) {
  return axios.put(ADD_SALOON + `/${body.id}`, body)
}

export function deleteService(id: string) {
  return axios.delete(DELETE_SERVICE + `/${id}`, {})
}



// ========= staff request
export function addStaff(body: any) {
  return axios.post(STAFFAPPOINTMENT, body)
}

export function getAllStaff(search: string, skip: number, limit: number) {
  return axios.get(STAFF + `?search=${search}&skip=${skip}&limit=${limit}`, {})
}

export function getDefaultStaffSlots(data:string) {
  return axios.get(DEFAULTSLOTS, {})
}

export function getStaff(id:any) {
  return axios.get(STAFF + `/${id}`)
}

export function getStaffSlots(id:any) {
  return axios.get(BOOKING+ `/slotByStaff`,{params:{
    staff: id
  }})
}

export function deleteStaff(id:any) {
  return axios.delete(STAFF + `/${id}`)
}


export function updateStaff(id: string, payload) {
  return axios.put(STAFF + `/${id}`, payload)
}

export function updateStaffStatus(id: string, payload) {
  return axios.put(STAFFStatus + `/${id}`, payload)
}

export function updateLeaveStaff(payload){
  return axios.put(STAFFLEAVE, payload)
}

// ***** coupon services *********

export function addCoupon(body: any) {
  return axios.post(COUPON, body)
}

export function getAllCoupon(search: string, skip: number, limit: number,status:string) {
  return axios.get(COUPON + `?search=${search}&skip=${skip}&limit=${limit}&status=${status}`, {})
}

export function getCoupon(id:any) {
  return axios.get(COUPON + `/${id}`)
}

export function deleteCoupon(id:any) {
  return axios.delete(COUPON + `/${id}`)
}


export function updateCoupon(id: string, payload) {
  return axios.put(COUPON + `/${id}`, payload)
}

export function updateCouponStatus(id: string, payload) {
  return axios.put(COUPONSTATUS + `/${id}`, payload)
}

// ******** appointment services *********


export function addAppointment(body: any) {
  return axios.post(APPOINTMENT, body)
}

export function getAllAppointment(search: string, skip: number, limit: number) {
  return axios.get(APPOINTMENT + `?search=${search}&skip=${skip}&limit=${limit}`, {})
}

export function getAppointment(skip:any,limit:any,search:any) {
  return axios.get(APPOINTMENT + `?search=${search}&skip=${skip}&limit=${limit}`,{})
}

export function deleteAppointment(id:any) {
  return axios.delete(APPOINTMENT + `/${id}`)
}


export function updateAppointment(id: string, payload) {
  return axios.put(APPOINTMENT + `/${id}`, payload)
}

export function updateAppointmentStatus(id: string, payload) {
  return axios.put(APPOINTMENT + `/status/${id}`, payload)
}