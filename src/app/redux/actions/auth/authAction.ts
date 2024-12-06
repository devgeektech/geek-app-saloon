import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUsers } from "../user/userAction";
import { toast } from "react-toastify";

const API_AUTH_URL = process.env.REACT_APP_API_URL;
const USER_URL = `${API_AUTH_URL}/auth/admin/login`;

export const loginUser = createAsyncThunk(
    "loginUser",
    async (values: any, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(`${USER_URL}`, values);
        return data;
      
      } catch (error: any) {
        return rejectWithValue(error.response.data?.responseMessage);
      }
    }
  );
