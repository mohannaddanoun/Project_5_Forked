import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },

    addProduct: (state, action) => {
      state.cart.push(action.payload);
    },
    checkoutCart: (state, action) => {
      
    },
    deleteProductById: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const {
  setCart,
  addProduct,
  checkoutCart,
  deleteProductById
} = cartSlice.actions;
export default cartSlice.reducer;
