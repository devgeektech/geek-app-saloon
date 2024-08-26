
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getServices = createAsyncThunk('getServices', async (details:any, { rejectWithValue, dispatch }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/product`, {
            headers: {
                'salon-Id': details.salonId
            },
        });
        
       
        
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
})







