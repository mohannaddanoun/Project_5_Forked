import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    inCart: []
  },
  reducers: {
    setCart: (state, action) => {
        console.log(action.payload);
      state.inCart = action.payload;
    },

    addProduct: (state, action) => {
      stateinCart.push(action.payload);
    },
    checkoutCart: (state, action) => {
      
    },
    deleteProductById: (state, action) => {
      state.inCart = state.inCart.filter(
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
