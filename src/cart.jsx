import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementQty, decrementQty } from "./CartSlice";
import { removeFromCart, clearCart } from "./CartSlice";
import { applyCoupon, removeCoupon } from "../Backend/CouponSlice";
import './style/cart.css';
import { QRCode } from "react-qr-code";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { addOrder } from "../Backend/OrderSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faDeleteLeft, faEraser, faPager, faPlus, faReceipt, faRemove } from "@fortawesome/free-solid-svg-icons";

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
                    {/* LEFT SIDE */}
                    <div className="left-side">

                        <h1>
                            <FontAwesomeIcon icon={faCartPlus} style={{ color: "cornflowerblue" }} />
                            Your Cart
                        </h1>

                        <div className="clear">
                            <button onClick={() => {
                                dispatch(clearCart());
                                setDiscPercent(0);
                                dispatch(removeCoupon());
                            }}>
                                < FontAwesomeIcon icon={faEraser} /> Clear Cart
                            </button>
                        </div>

                        <div className="cart-items">
                            {items.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} />
                                    <h2>{item.name}</h2>
                                    <p>Price: ₹{item.price}</p>
                                    {/* <p>{item.description}</p> */}

                                    <button onClick={() => {
                                        dispatch(removeFromCart(item.id));
                                        setDiscPercent(0);
                                        dispatch(removeCoupon());
                                    }} style={{ color: "orangered", fontWeight: "600" }}>
                                        <FontAwesomeIcon icon={faRemove} />  Remove
                                    </button>

                                    <button className="button-incdec" style={{ color: "darkgoldenrod", fontWeight: "600" }} onClick={() => dispatch(decrementQty(item.id))}>< FontAwesomeIcon icon={faDeleteLeft} />-</button>
                                    <span style={{ color: "orangered", fontWeight: "900" }}>{item.quantity}</span>
                                    <button className="button-incdec" style={{ color: "darkgoldenrod", fontWeight: "600" }} onClick={() => dispatch(incrementQty(item.id))}>< FontAwesomeIcon icon={faPlus} />+</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="right-side">

                        <div className="bill">
                            <h1><FontAwesomeIcon icon={faReceipt} /> Bill Summary</h1>

                            <p><span>Total Quantity:</span><span>{totalQuantity}</span></p>
                            <p><span>Total Amount:</span><span>₹{totalAmount.toFixed(2)}</span></p>
                            <p><span>Discount:</span><span>{discPercent}%</span></p>
                            <p><span>Discount Amount:</span><span>₹{discAmount.toFixed(2)}</span></p>

                            <p>
                                <span><label>Enter Coupon Code:</label></span>
                                <span>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Enter coupon code"
                                    />
                                </span>
                            </p>

                            <button onClick={() => {
                                dispatch(applyCoupon(input));
                                setInput("");
                            }}>
                                <FontAwesomeIcon icon={faPager} /> Apply Coupon
                            </button>

                            <p><span>Price After Discount:</span><span>₹{priceAfterDisc.toFixed(2)}</span></p>
                            <p><span>GST (18%):</span><span>₹{gstAmount.toFixed(2)}</span></p>
                            <p><span>Final Amount:</span><span>₹{finalAmount.toFixed(2)}</span></p>

                            <div className="discount-buttons">
                                <button onClick={() => setDiscPercent(10)}>Apply 10%</button>
                                <button onClick={() => setDiscPercent(20)}>Apply 20%</button>
                                <button onClick={() => setDiscPercent(30)}>Apply 30%</button>
                                <button onClick={() => setDiscPercent(0)}>Remove</button>
                            </div>
                        </div>

                        <div className="payment-section">
                            <div className="checkout-container">
                                <button className="checkout-button" onClick={() => setCheckout(!checkout)}>
                                    Payment Checkout
                                </button>
                            </div>

                            {checkout && (
                                <div className="checkout">
                                    <button onClick={() => setPaymentMethod("Credit Card")}>Credit Card</button>
                                    <button onClick={() => setPaymentMethod("qr")}>QR Code</button>
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
                                <h3 style={{ color: "tan" }}>Enter your email to receive order details:</h3>
                                <p>
                                    <span><label>Email:</label></span>
                                    <span>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter Your Email"
                                        />
                                    </span>
                                </p>
                                <p>
                                    <span >
                                        <button onClick={() => {
                                            handleCheckoutEmail();
                                            dispatch(addOrder(purchaseDetails));
                                            navigate("/Orders");
                                        }} >
                                            Email Confirmation
                                        </button>
                                    </span>
                                </p>

                            </div>
                        </div>

                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;