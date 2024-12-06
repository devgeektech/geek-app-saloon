import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_AUTH_URL = process.env.REACT_APP_API_URL;
const USER_URL = `${API_AUTH_URL}/vendor/getNearbyVendorList`;

export const saloon = createAsyncThunk(
  "saloon",
  async (values: any, { rejectWithValue }) => {
    try {
      const { skip = 1, limit = 10, search = '', lat="", long=""} = values;
      let queryParams = `?lat=${lat}&long=${long}&skip=${skip}&limit=${limit}&search=${search}`;
      
      const { data } = await axios.get(`${USER_URL}${queryParams}`, {});
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);




export const addSaloon = createAsyncThunk(
  "saloon/addSaloon",
  async (saloonData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/saloon", saloonData); 
      toast.success(response.data.responseMessage);
      return response.data;
    } catch (error:any) {
      toast.error(error.response?.data?.responseMessage || "Something went wrong");
      return rejectWithValue(error.response?.data);
    }
  }
);



export const fetchSaloonList = createAsyncThunk(
  "saloon/fetchSaloonList",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/saloon", { params });
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data);
    }
  }
);


 