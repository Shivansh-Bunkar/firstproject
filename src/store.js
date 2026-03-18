import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import couponReducer from "../Backend/CouponSlice";
import orderReducer from "../Backend/OrderSlice";
import bookingReducer from "../Backend/BookingSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        coupon: couponReducer,
        order: orderReducer,
        booking: bookingReducer
    }
});