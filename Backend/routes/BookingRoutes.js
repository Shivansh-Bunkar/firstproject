import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/**
 * CREATE BOOKING
 */
router.post("/book-table", async (req, res) => {
    try {
        const { userId, restaurantId, tables, date, time, persons } = req.body;

        // basic validation
        if (!userId || !restaurantId || !tables?.length) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const booking = new Booking({
            userId,
            restaurantId,
            tables,
            date,
            time,
            persons,
        });

        await booking.save();

        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/**
 * GET BOOKINGS BY RESTAURANT
 */
router.get("/bookings/:restaurantId", async (req, res) => {
    try {
        const bookings = await Booking.find({
            restaurantId: req.params.restaurantId,
        });

        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;