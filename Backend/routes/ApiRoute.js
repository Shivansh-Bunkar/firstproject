import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();
router.post("/book-table", async (req, res) => {
    try {
        const booking = new Booking({
            userId: req.body.userId,
            tables: req.body.tables,
            restaurantId: req.body.restaurantId,
            date: req.body.date,
            time: req.body.time,
            persons: req.body.persons,
        });

        await booking.save();

        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;