import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProductById: (state, action) => {
      state.products = state.products.map((oneProduct) =>
        oneProduct.id === action.payload.id ? action.payload : oneProduct
      );
    },
    deleteProductById: (state, action) => {
      state.products = state.products.filter(
        (oneProduct) => oneProduct.id !== action.payload
      );
    },
    setComments: (state, action) => {
      state.products = state.products.map((oneProduct) =>
        oneProduct.id === action.payload.id
          ? { ...oneProduct, comments: action.payload.comments }
          : oneProduct
      );
    },
    addComment: (state, action) => {
      state.products = state.products.map((oneProduct) =>
        oneProduct.id === action.payload.id
          ? {
              ...oneProduct,
              comments: [...oneProduct.comments, action.payload.comments],
            }
          : oneProduct
      );
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProductById,
  deleteProductById,
  setComments,
  addComment,
} = productsSlice.actions;
export default productsSlice.reducer;
