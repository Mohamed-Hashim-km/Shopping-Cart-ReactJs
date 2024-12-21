import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:"product",
    initialState:{
       product:[]
    },
    reducers:{
        ProductStore:(state,action)=>{
            return action.payload
        }
    }
})



export const productReducer=productSlice.reducer;

export const {ProductStore}=productSlice.actions;