import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import "./style/payment.css";
import { QRCode } from "react-qr-code";
import axios from "axios";
const Payment = () => {
    const location = useLocation();
    const { selectedTables, restaurantId } = location.state || {};
    const navigate = useNavigate();
    // ✅ SAFE DATA (fix crash + re-render issue)
    const selectedTablesSafe = selectedTables || [];

    const [paymentMethod, setPaymentMethod] = useState("");

    // ✅ FIXED total calculation
    const totalPrice = selectedTablesSafe.reduce(
        (total, t) => total + t.price,
        0
    );

    // const handleRazorpay = async () => {
    //     try {
    //         // 1. create order
    //         const { data } = await axios.post(
    //             "http://localhost:5000/api/payment/create-order",
    //             { amount: totalPrice }
    //         );

    //         const options = {
    //             key: "YOUR_KEY_ID", // from Razorpay
    //             amount: data.amount,
    //             currency: "INR",
    //             name: "Rasoi Reserve",
    //             description: "Table Booking Payment",
    //             order_id: data.id,

    //             handler: async function (response) {
    //                 // ✅ payment success
    //                 await handlePayment(); // your booking API
    //                 navigate("/success");
    //             },

    //             prefill: {
    //                 name: "User",
    //                 email: "test@example.com",
    //             },

    //             theme: {
    //                 color: "#16a34a",
    //             },
    //         };

    //         const rzp = new window.Razorpay(options);
    //         rzp.open();

    //     } catch (err) {
    //         toast.error("Payment failed");
    //     }
    // };

    const handlePayment = async () => {
        try {
            await fetch("http://localhost:5000/api/book-table", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    restaurantId,
                    tables: selectedTablesSafe.map(t => t.id), // ✅ FIX
                }),
            });

            toast.success("Payment + Booking Successful");
        } catch {
            toast.error("Payment failed");
        }
    };

    const handlePayments = async () => {
        if (paymentMethod === "") {
            toast.error("Please select a payment method");
            return;
        }

        try {
            switch (paymentMethod) {

                case "upi":
                    toast.success("Scan QR to pay");

                    // simulate payment success after 3 sec
                    setTimeout(() => {
                        navigate("/success");
                    }, 3000);

                case "card":
                    toast.success("Card payment coming soon");
                    return;

                case "cash":
                    await handlePayment();
                    navigate("/success");
                    return;

                default:
                    toast.error("Invalid payment method");
            }

        } catch {
            toast.error("Payment failed!");
        }
    };

    return (
        <div className="payment-container">

            <h2>💳 Payment Summary</h2>

            {/* Selected Tables */}
            <div className="payment-section">
                <h3>Selected Tables</h3>

                {selectedTablesSafe.length === 0 ? (
                    <p>No tables selected</p>
                ) : (
                    selectedTablesSafe.map((table) => (
                        <div key={table.id} className="payment-item">
                            <span>Table {table.id} ({table.type})</span>
                            <span>₹{table.price}</span>
                        </div>
                    ))
                )}
            </div>

            {/* Total Amount */}
            <div className="payment-total">
                <h3>Total: ₹{totalPrice}</h3>
            </div>

            {/* Payment Options */}
            <div className="payment-methods">
                <h3>Select Payment Method</h3>

                <label>
                    <input
                        type="radio"
                        name="payment"
                        value="upi"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    UPI
                </label>

                <label>
                    <input
                        type="radio"
                        name="payment"
                        value="card"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Card
                </label>

                <label>
                    <input
                        type="radio"
                        name="payment"
                        value="cash"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Pay at Restaurant
                </label>
            </div>

            {/* ✅ QR Code Rendering (correct place) */}


            {/* Pay Button */}
            <button
                className="pay-btn"
                disabled={paymentMethod === "" || selectedTablesSafe.length === 0}
                onClick={handlePayments}
            >
                Pay Now
            </button>
            {/* <button
                className="pay-btn"
                onClick={handleRazorpay}
                disabled={selectedTablesSafe.length === 0}
            >
                Pay Now
            </button> */}
            {paymentMethod === "upi" && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <QRCode
                        value={`upi://pay?pa=7389959273@nyes&pn=Shivansh-Bunkar&am=${totalPrice}&cu=INR`}
                    />
                    <p>Scan & Pay ₹{totalPrice}</p>
                </div>
            )}

        </div>
    );
};

export default Payment;