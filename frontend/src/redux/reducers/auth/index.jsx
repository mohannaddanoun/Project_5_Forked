import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        token:localStorage.getItem("token") ||null,
        userid: localStorage.getItem("userId") ||null,
        isLoggedIn: localStorage.getItem("token")? true:false,
    },
    reducers: {
        setLogin: (state, action) => {
          state.token = action.payload;
          state.isLoggedIn =true
          localStorage.setItem("token", action.payload);
        },
        setUserId: (state, action) => {
          state.userid = action.payload;
            
        },
        setLogout: (state, action) => {
          state.token = null;
          state.userid = null;
          state.isLoggedIn = false;
        //  localStorage.clear();
        },
      },
})


export const {
    setLogin,
    setUserId,
    setLogout,
}= authSlice.actions
export default authSlice.reducer