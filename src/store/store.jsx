import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./addCartSlice";
import { productReducer } from "./productSlice";

export const store=configureStore({
    reducer:{
        cartState:cartReducer,
        productState:productReducer,
    }

})