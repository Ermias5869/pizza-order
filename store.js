import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./src/features/user/userSlice"
import cartReducers from "./src/features/cart/CardSlice"

const store=configureStore({
    reducer:{
        user:userReducers,
        cart:cartReducers,
    },
})
export default store;