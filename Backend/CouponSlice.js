import { createSlice } from "@reduxjs/toolkit";
import { coupons } from "./coupon";

const couponSlice = createSlice({
    name: "coupon",
    initialState: {
        code: "",
        discount: 0,
        applied: false,
        message: ""
    },
    reducers: {
        applyCoupon: (state, action) => {
            const enteredCode = action.payload.toUpperCase();
            const coupon = coupons.find(c => c.code === enteredCode);

            if (coupon) {
                state.code = coupon.code;
                state.discount = coupon.discount;
                state.applied = true;
                state.message = `Coupon ${coupon.code} applied! You got ${coupon.discount}% off.`;
            } else {
                state.code = "";
                state.discount = 0;
                state.applied = false;
                state.message = "Invalid coupon code. Please try again.";
            }
        },
        removeCoupon: (state) => {
            state.code = "";
            state.discount = 0;
            state.applied = false;
            state.message = "";
        }
    }
});

export const { applyCoupon, removeCoupon } = couponSlice.actions;
export default couponSlice.reducer;