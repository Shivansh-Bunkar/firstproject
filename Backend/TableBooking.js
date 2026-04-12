import { createSlice } from "@reduxjs/toolkit";

const tableBookingSlice = createSlice({
    name: "tableBooking",
    initialState: {
        tableBookings: []
    },
    reducers: {
        addTableBooking: (state, action) => {
            state.tableBookings.push(action.payload);
        }
    }
});

export const { addTableBooking } = tableBookingSlice.actions;
export default tableBookingSlice.reducer;