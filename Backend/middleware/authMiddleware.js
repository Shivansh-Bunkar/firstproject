const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token = req.headers.authorization;


    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    } else {
        return res.status(401).json({ message: "No token" });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // same as login

        // ✅ keep your logic, just safer
        req.user = { id: decoded.id };

        next();
    } catch (err) {
        console.error("Auth Error:", err.message); // 👈 added for debugging
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;