import React from "react";
import { useNavigate } from "react-router-dom";
import "./style/success.css";

const BookingSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="success-container">
            <div className="success-card">
                <div className="success-icon">✅</div>

                <h1>Table Booked Successfully!</h1>
                <p>Your booking has been confirmed 🎉</p>

                <button onClick={() => navigate("/")}>
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default BookingSuccess;