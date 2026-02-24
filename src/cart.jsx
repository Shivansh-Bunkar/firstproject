import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementQty, decrementQty } from "./CartSlice";
import { removeFromCart, clearCart } from "./CartSlice";
import { applyCoupon, removeCoupon } from "../Backend/CouponSlice";
import './cart.css';

function Cart() {

    const dispatch = useDispatch();

    const items = useSelector(globalState => globalState.cart.items);

    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const [discPercent, setDiscPercent] = useState(0);

    const [input, setInput] = useState(0);

    const discAmount = (totalAmount * discPercent) / 100;

    const { discount: discount } = useSelector(state => state.coupon);

    const priceAfterDisc = totalAmount - discAmount - (totalAmount * discount / 100);

    const gstAmount = priceAfterDisc * 0.18;

    const finalAmount = priceAfterDisc + gstAmount;

    return (
        <>
            <h1>Your Cart</h1>

            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <button
                        onClick={() => {
                            dispatch(clearCart());
                            setDiscPercent(0);
                            dispatch(removeCoupon());
                        }}
                    >
                        Clear Cart
                    </button>

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

                                <button
                                    className="button-incdec"
                                    onClick={() => dispatch(decrementQty(item.id))}
                                >
                                    -
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    className="button-incdec"
                                    onClick={() => dispatch(incrementQty(item.id))}
                                >
                                    +
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="bill">
                        <h2>Bill Summary</h2>

                        <p>Total Quantity: {totalQuantity}</p>
                        <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>

                        <p>Discount: {discPercent}%</p>
                        <p>Discount Amount: ₹{discAmount.toFixed(2)}</p>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter coupon code"
                        />

                        <button
                            onClick={() => {
                                dispatch(applyCoupon(input)); // ❌ removed removeFromCart()
                                setInput("");
                            }}
                        >
                            Apply Coupon
                        </button>

                        <p>Price After Discount: ₹{priceAfterDisc.toFixed(2)}</p>
                        <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>
                        <p>Final Amount: ₹{finalAmount.toFixed(2)}</p>

                        {/* Optional manual discount buttons (remove if using coupon only) */}
                        <div className="discount-buttons">
                            <button onClick={() => setDiscPercent(10)}>Apply 10% Discount</button>
                            <button onClick={() => setDiscPercent(20)}>Apply 20% Discount</button>
                            <button onClick={() => setDiscPercent(30)}>Apply 30% Discount</button>
                            <button onClick={() => setDiscPercent(0)}>Remove Discount</button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Cart;