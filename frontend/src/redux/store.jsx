import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/index"
import productsReducer  from "./reducers/products/index";
import  categorySlice  from "./reducers/categories/index";
import  cartSlice  from "./reducers/cart";

export default configureStore({
    reducer:{
auth:authReducer,
products : productsReducer,
categories : categorySlice,
cart : cartSlice,
    },
})