import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementQty, decrementQty } from "./CartSlice";
import { removeFromCart, clearCart } from "./CartSlice";
import { applyCoupon, removeCoupon } from "../Backend/CouponSlice";
import './cart.css';
import { QRCode } from "react-qr-code";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { addOrder } from "../Backend/OrderSlice";
import { useNavigate } from "react-router-dom";

function Cart() {

    const dispatch = useDispatch();
    const items = useSelector(globalState => globalState.cart.items);
    const { discount } = useSelector(state => state.coupon);

    const [discPercent, setDiscPercent] = useState(0);
    const [input, setInput] = useState(0);
    const [checkout, setCheckout] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const gst = 0.18;
    const orderId = Math.floor(Math.random() * 1000000);
    const shippingCost = 50;
    const totalQuantity = useMemo(() => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }, [items]);

    const totalAmount = useMemo(() => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [items]);

    const discAmount = useMemo(() => {
        return (totalAmount * discPercent) / 100;
    }, [totalAmount, discPercent]);

    const priceAfterDisc = useMemo(() => {
        return totalAmount - discAmount - (totalAmount * discount / 100);
    }, [totalAmount, discAmount, discount]);

    const gstAmount = useMemo(() => {
        return priceAfterDisc * gst;
    }, [priceAfterDisc]);

    const finalAmount = useMemo(() => {
        return priceAfterDisc + gstAmount;
    }, [priceAfterDisc, gstAmount]);


    const templateParams = {
        order_id: orderId,
        orders: items.map(item => ({
            name: item.name,
            units: item.quantity,
            price: item.price.toFixed(2)
        })),
        cost: {
            shipping: shippingCost.toFixed(2),
            tax: gstAmount.toFixed(2),
            total: finalAmount.toFixed(2)
        },
        email: email
    };

    const purchaseDetails = {
        orderId: orderId,
        shippingCost: shippingCost,
        date: new Date().toLocaleDateString(),
        items: items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price.toFixed(2)
        })),
        totalAmount: finalAmount.toFixed(2)
    };

    const handleCheckoutEmail = () => {
        emailjs.send("service_170bn2j", "template_agchm6g", templateParams, "QIhxov6-5_kkxM4di")
            .then(() => toast.success("Checkout email sent successfully!", {
                duration: 3000,
                style: { background: "#4CAF50", color: "white" }
            }))
            .catch((err) => {
                toast.error("Failed to send checkout email!", {
                    duration: 3000,
                    style: { background: "#f44336", color: "white" }
                });
                console.error("Email sending failed", err);
            });
        dispatch(clearCart());
    };

    return (
        <div className="cart-page">
            {items.length === 0 ? (
                <h1>Your cart is empty.</h1>
            ) : (
                <>
                    <h1>Your Cart</h1>
                    <div className="clear">
                        <button
                            onClick={() => {
                                dispatch(clearCart());
                                setDiscPercent(0);
                                dispatch(removeCoupon());
                            }}
                        >
                            Clear Cart
                        </button>
                    </div>

                    <div className="cart-items">
                        {items.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <h2>{item.name}</h2>
                                <p>Price: ₹{item.price}</p>
                                <p>{item.description}</p>

                                <button onClick={() => { dispatch(removeFromCart(item.id)); setDiscPercent(0); dispatch(removeCoupon()); }}>
                                    Remove
                                </button>

                                <button className="button-incdec" onClick={() => dispatch(decrementQty(item.id))}>-</button>
                                <span>{item.quantity}</span>
                                <button className="button-incdec" onClick={() => dispatch(incrementQty(item.id))}>+</button>
                            </div>
                        ))}
                    </div>

                    <div className="bill">
                        <h2>Bill Summary</h2>
                        <p>Total Quantity: {totalQuantity}</p>
                        <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>

                        <p>Discount: {discPercent}%</p>
                        <p>Discount Amount: ₹{discAmount.toFixed(2)}</p>

                        <label>Enter Coupon Code:</label>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter coupon code"
                        />
                        <button onClick={() => { dispatch(applyCoupon(input)); setInput(""); }}>
                            Apply Coupon
                        </button>

                        <p>Price After Discount: ₹{priceAfterDisc.toFixed(2)}</p>
                        <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>
                        <p>Final Amount: ₹{finalAmount.toFixed(2)}</p>

                        <div className="discount-buttons">
                            <button onClick={() => setDiscPercent(10)}>Apply 10% Discount</button>
                            <button onClick={() => setDiscPercent(20)}>Apply 20% Discount</button>
                            <button onClick={() => setDiscPercent(30)}>Apply 30% Discount</button>
                            <button onClick={() => setDiscPercent(0)}>Remove Discount</button>
                        </div>
                    </div>

                    <button className="checkout" onClick={() =>
                        setCheckout(true)}>
                        Checkout
                    </button>

                    {checkout && (
                        <div className="checkout">
                            <h2>CheckOut Summary</h2>
                            <button onClick={() => setPaymentMethod("Credit Card")}>Credit Card</button>
                            <button onClick={() => setPaymentMethod("qr")}>QR Code</button>
                        </div>
                    )}

                    {paymentMethod === "Credit Card" && (
                        <div className="payment">
                            <h2>Payment Method: {paymentMethod}</h2>
                            <p>Final Amount to Pay: ₹{finalAmount.toFixed(2)}</p>
                        </div>
                    )}

                    {paymentMethod === "qr" && (
                        <div className="payment">
                            <h2>Payment Method: {paymentMethod}</h2>
                            <p>Final Amount to Pay: ₹{finalAmount.toFixed(2)}</p>
                            <QRCode value={`upi://pay?pa=7389959273@nyes&pn=Shivansh-Bunkar&am=${Number(finalAmount).toFixed(2)}&cu=INR`} />
                        </div>
                    )}

                    <div id="div-cont">
                        <label>Enter email for confirmation:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)}
                            placeholder="Enter Your Email"
                        />
                        <br /><br />
                        <button onClick={() => {
                            handleCheckoutEmail();
                            dispatch(addOrder(purchaseDetails));
                            navigate("/Orders");
                        }}>
                            Checkout Email
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;