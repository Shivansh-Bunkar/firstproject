import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sys",
});

db.connect((err) => {
    if (err) console.log("DB Connection Failed:", err);
    else console.log("MySQL Connected");
});

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields required" });
    }

    const sql =
        "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Data saved successfully" });
    });
});

app.listen(8080, () =>
    console.log("Server running on http://localhost:8080")
);