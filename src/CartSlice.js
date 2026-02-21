import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                item => item.id === action.payload.id
            );

            if (existingItem) {
                existingItem.quantity += 1;   // only increase number
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },

        incrementQty: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },

        decrementQty: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter(i => i.id !== action.payload);
                }
            }
        }
        ,
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, incrementQty, decrementQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;