import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const saloonForm = {
    name: "",
    description: "",
    location:"",
    latitude:"",
    longitude:""
  
  };
  
  
  
const saloonSlice = createSlice({
    name: "saloon",
    initialState: {
        initialValues: saloonForm,
        saloonList: [] ,
        loading: false,
        error: null,
        isModalOpen: false,
        skip: 0, 
        limit: 10, 
        search:'',
        totalRecord : 0,
        saloonId:null    
      },
    reducers: {
        setSaloonId: (state, action) => {
            console.log('action---setSaloonId------>',action.payload)
            state.saloonId = action.payload;
        },
        addSaloonRequest: (state, action) => {
            console.log('action--------->',action.payload)
            // state.loading = true;
            // state.error = null;
            return {...state, loading: true, error: null}
        },
        addSaloonSuccess: (state: any, action) => {
            toast.success(action.payload.responseMessage);
            state.loading = false;
            state.error = null;
            state.saloonList = [...state.saloonList, action.payload.data];
        },
        addSaloonFailure: (state, action) => {
            toast.error(action.payload.responseMessage);
            state.error = action.payload;
            state.loading = false;
        },
      
       
        getSaloonRequest: (state,action) => {
            return { ...state, loading: true, error: null };
        },
     
        getSaloonListSuccess: (state, action) => {
            state.loading = false;
            state.saloonList = action.payload.data.data;    
            state.totalRecord = action.payload.totalRecord;
            state.skip = action.payload.skip;
            state.limit = action.payload.limit;
          },
      
        getSaloonListFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
        
    },
});

export const {
  addSaloonFailure,addSaloonRequest, addSaloonSuccess,getSaloonRequest,getSaloonListSuccess,getSaloonListFailure, setSaloonId
} = saloonSlice.actions;

export default saloonSlice.reducer;
