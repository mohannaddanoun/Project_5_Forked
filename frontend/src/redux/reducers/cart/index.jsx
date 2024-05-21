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
      state.inCart.push(action.payload);
    },
    checkoutCart: (state, action) => {

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
