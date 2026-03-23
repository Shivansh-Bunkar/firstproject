const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        const user = await User.create({ name, email, password });

        res.json({ message: "Registered", user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user by email
        const user = await User.findOne({ email });

        // 2. Check if user exists and password matches
        // Note: Use bcrypt.compare() later if you hash passwords!
        if (user && user.password === password) {
            res.json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;