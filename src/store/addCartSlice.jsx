import { createSlice } from "@reduxjs/toolkit";

const cartslicer = createSlice({
  name: "carts",
  initialState: {
    cart: [],
    isOpen: false,
  },
  reducers: {
    AddItem: (state, action) => {
      //  return [...state.cart,{...action.payload.product,quantity:1}]
      state.cart.push({ ...action.payload.product, quantity: 1 });
     
    },
    Delete: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    Increase: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id == action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    },
    Decrease: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id == action.payload.id) {
          return { ...item, quantity: Math.max(item.quantity - 1, 1) };
        } else {
          return item;
        }
      });
    },
    TOggleDrawer: (state, action) => {
      state.isOpen = !state.isOpen;
    },

    RemoveAll: (state, action) => {
      state.cart = [];
    },
  },
});

export const cartReducer = cartslicer.reducer;
export const { AddItem, Delete, Increase, Decrease, RemoveAll, TOggleDrawer } = cartslicer.actions;
