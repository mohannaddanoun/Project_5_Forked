import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    setcategories: (state, action) => {
      state.categories = action.payload;
    },

    addcategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updatecategoryById: (state, action) => {
      state.categories = state.categories.map((onecategory) =>
        onecategory.id === action.payload.id ? action.payload : onecategory
      );
    },
    deletecategoryById: (state, action) => {
      state.categories = state.categories.filter(
        (onecategory) => onecategory.id !== action.payload
      );
    },
  },
});

export const {
  setcategories,
  addcategory,
  updatecategoryById,
  deletecategoryById,
} = categorySlice.actions;
export default categorySlice.reducer;
