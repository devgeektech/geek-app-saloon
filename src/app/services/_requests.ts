import axios from 'axios'
import { AuthModel, UserModel, CategoryModel } from './_models'
import { setSelectedTab } from '../redux/reducer/serviceSlice'
// import {AuthProvider, setupAxios} from '../../app'
const API_URL = process.env.REACT_APP_API_URL
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/verify_token`
export const LOGIN_URL = `${API_URL}/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgotPassword`
export const ADMIN_LOGIN_URL = `${API_URL}/auth/admin/login`
export const CATEGORY_URL = `${API_URL}/category`
export const SUB_CATEGORY_URL = `${API_URL}/subcategory`

export const GET_VENDORS = `${API_URL}/vendor/getNearbyVendorList`
export const DELETE_VENDOR = `${API_URL}/vendor/deleteVendor`

export const GET_USERS = `${API_URL}/users`
export const DELETE_USER = `${API_URL}/users`

export const BANNER = `${API_URL}/banner`


export const SERVICE_URL = `${API_URL}/product`
export const FILE_UPLOAD = `${API_URL}/product/upload`
export const GET_ALL_PRODUCT = `${API_URL}/product`


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
export function createCategory(name: string, photo: string) {
  return axios.post(CATEGORY_URL, {
    name,
    photo,
  })
}

export function getCategory(search: string, skip: number, limit: number) {
  return axios.get(CATEGORY_URL + `?search=${search || ""}&skip=${skip || 0}&limit=${limit || 10}`, {})
}

export function deleteCategory(id: string) {
  return axios.delete(CATEGORY_URL + `/${id}`, {})
}

export function updateCategory(id: string, name: string, photo: string) {
  return axios.put(CATEGORY_URL + `/${id}`, {
    name,
    photo,
  })
}

export function createSubCategory(id: string, name: string, image: string) {
  return axios.post(SUB_CATEGORY_URL, { id, name, image, })
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
  return axios.get(GET_ALL_PRODUCT + `?search=${search}&skip=${skip}&limit=${limit}`)
}

export function editService(body: any) {
  return axios.put(SERVICE_URL, body)
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
export function getBanner(id) {
  return axios.get(BANNER + `/${id}`)
}
export function deleteBanner(id) {
  return axios.delete(BANNER + `/${id}`)
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
