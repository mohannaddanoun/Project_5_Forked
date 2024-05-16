import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/index"
import productsReducer  from "./reducers/products/index";
import  categorySlice  from "./reducers/category";

export default configureStore({
    reducer:{
auth:authReducer,
products : productsReducer,
category : categorySlice,
    },
})