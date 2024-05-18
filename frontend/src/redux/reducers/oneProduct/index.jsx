import { createSlice } from "@reduxjs/toolkit";

export const oneProductSlice = createSlice({
  name: "oneProduct",
  initialState: {
    oneProduct: [],
  },
  reducers: {
    setOneProduct: (state, action) => {
      state.oneProduct = action.payload;
    },
  },
});

export const { setOneProduct } = oneProductSlice.actions;
export default oneProductSlice.reducer;
