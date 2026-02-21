import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementQty, decrementQty } from "./CartSlice";
import { removeFromCart, clearCart } from "./CartSlice";
import './cart.css';

function Cart() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);

    return (
        <>
            <h1>Your Cart</h1>
            <button onClick={() => dispatch(clearCart())}>Clear Cart</button>

            <div className="cart-items">

                {items.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>Price: ₹{item.price}</p>
                        <p>{item.description}</p>
                        <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                        <button className="button-incdec" onClick={() => dispatch(decrementQty(item.id))}>-</button>
                        <span>{item.quantity}</span>
                        <button className="button-incdec" onClick={() => dispatch(incrementQty(item.id))}>+</button>
                    </div>
                ))}
            </div>

        </>
    );
}

export default Cart;