export const fileTypeMap: { [key: string]: string } = {
  "89504e47": "image/png",    
  "ffd8ffe0": "image/jpeg",    
  "ffd8ffe1": "image/jpeg",    
  "ffd8ffe2": "image/jpeg",    
  "ffd8ffe3": "image/jpeg",   
  "ffd8ffe8": "image/jpeg",   
  "47494638": "image/gif",    
  "3c3f786d6c": "image/svg+xml", 
  "3c737667": "image/svg+xml", 
  "52494646": "image/webp",       
  "424d": "image/bmp",         
  "66747970": "image/heif"   
};

export const IMAGE_BASE_URL = 'http://localhost:3000/';
export const PHONE_REGEX = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
export const INVALID_PHONE_NUMBER = "Please enter valid contact number";
export const REQUIRED = "Required";
export const SUCCESS = "Success.";
export const ADD = "Add";
export const EDIT = "Edit";
export const UPDATE = "Update"
export const SALOON_ID_REQUIRED = "Saloon id required.";
export const DASHBOARD = "/dashboard";
export const USERS = "/users";
export const VENDOR = "/vendor";

