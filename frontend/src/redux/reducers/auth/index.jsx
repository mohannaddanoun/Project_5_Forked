import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        token:null,// || JSON.parse(localStorage.getItem("token")),
        userid: null,
        isLoggedIn: false,
    },
    reducers: {
        setLogin: (state, action) => {
          state.token = action.payload;
          state.isLoggedIn = true;
        //  localStorage.setItem("token", action.payload);
        },
        setUserId: (state, action) => {
          state.userid = action.payload;
        //  localStorage.setItem("userId", action.payload);
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