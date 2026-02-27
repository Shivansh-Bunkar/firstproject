import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: "order",
    initialState: [],
    reducers: {
        addOrder: (state, action) => {
            const newOrder = action.payload;
            state.push(newOrder);
        }
    }
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;