import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_AUTH_URL = process.env.REACT_APP_API_URL;
const USER_URL = `${API_AUTH_URL}/users`;

export const getUsers = createAsyncThunk(
  "getUsers",
  async (values: any, { rejectWithValue }) => {
    
    try {
      const { page = 1, limit = 10, search = ''} = values;
      let queryParams = `?page=${page}&limit=${limit}&search=${search}`;
      
      const { data } = await axios.get(`${USER_URL}${queryParams}`, {});
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);




export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (values: any, { rejectWithValue, dispatch ,getState}) => {
    try {
      const store :any= getState();
      const {page ,limit} = store.userList;
      const id = values._id;
      const { data } = await axios.delete(`${USER_URL}/${id}`, {});

      dispatch(getUsers({ page: page, limit: limit }))
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

