import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/index"
import productsReducer  from "./reducers/products/index";


export default configureStore({




    reducer:{
auth:authReducer,
products : productsReducer
    }

    
})