import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import couponReducer from "../Backend/CouponSlice";


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        coupon: couponReducer
    }
});