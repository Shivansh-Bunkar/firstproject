import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import couponReducer from "../Backend/CouponSlice";
import orderReducer from "../Backend/OrderSlice";


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        coupon: couponReducer,
        order: orderReducer
    }
});