import axios from 'axios'
import { AuthModel, UserModel, CategoryModel } from './_models'
// import {AuthProvider, setupAxios} from '../../app'
const API_URL = process.env.REACT_APP_API_URL
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/verify_token`
export const LOGIN_URL = `${API_URL}/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`
export const ADMIN_LOGIN_URL = `${API_URL}/auth/admin/login`
export const CREATE_CATEGORY = `${API_URL}/category`
export const GET_CATEGORY = `${API_URL}/category`
export const CREATE_SUB_CATEGORY = `${API_URL}/subcategory`
export const GET_SUB_CATEGORY = `${API_URL}/subcategory`
export const GET_BANNERS = `${API_URL}/banner/getBanners`
export const GET_VENDORS = `${API_URL}/vendor/getNearbyVendorList`
export const GET_USERS = `${API_URL}/users`
export const DELETE_USER = `${API_URL}/users`
export const ADD_BANNER = `${API_URL}/banner/addBanner`
export const ADD_SERVICE = `${API_URL}/product`
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
  return axios.post(CREATE_CATEGORY, {
    name,
    photo,
  })
}

export function getCategory(search: string, skip: number, limit: number) {
  return axios.get(GET_CATEGORY + `?search=${search}&skip=${skip}&limit=${limit}`, {})
}

export function createSubCategory(id: string, name: string, image: string) {
  return axios.post(CREATE_SUB_CATEGORY, { id, name, image, })
}

export function getSubCreateCategory(search: string, skip: number, limit: number) {
  return axios.get(GET_SUB_CATEGORY + `?search=${search}&skip=${skip}&limit=${limit}`)
}

// **************************SERVICES API ************************

export function addService(body: any) {
  return axios.post(ADD_SERVICE, body)
}


export function editService(body: any) {
  return axios.put(ADD_SERVICE, body)
}

export function editServiceData(body: any) {
  return body
}


// *************************Modal API ************************
export function modalStatus(value) {
  return value
}




export function getBanners() {
  return axios.get(GET_BANNERS, {})
}

export function getVendors(lat: any, long: any, skip: any, limit: any) {
  return axios.get(GET_VENDORS + `?lat=${lat}&long=${long}&skip=${skip}&limit=${limit}`, {})
}

export function getUsersList(search: string) {
  return axios.get(GET_USERS + `?search=${search}`, {})
}

export function deleteUserApi(id: string) {
  return axios.delete(DELETE_USER + `/${id}`, {})
}

export function addBanner(body: any) {
  return axios.post(ADD_BANNER, { body })
}



export function commonFileUpload(file: any) {
  return axios.post(FILE_UPLOAD, file)
}

export function getAllServices(search: string, skip: number, limit: number) {
  return axios.get(GET_ALL_PRODUCT + `?search=${search}&skip=${skip}&limit=${limit}`)
}
