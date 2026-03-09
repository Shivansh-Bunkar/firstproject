import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './orders.css';

function Orders() {

    let orders = useSelector(globalState => globalState.order);


    return (
        <>
            <div className="orders-container">
                <h1 className="orders-title">Orders Page</h1>

                {orders.length === 0 ? (
                    <div className="orders-empty">
                        <div className="dots-loader">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <p>No orders yet. Stay tuned!</p>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div className="order-card" key={order.orderId}>
                                <div className="order-row">
                                    <span className="order-label">Order ID:</span>
                                    <span className="order-value">{order.orderId}</span>
                                </div>
                                <div className="order-row">
                                    <span className="order-label">Date:</span>
                                    <span className="order-value">{order.date}</span>
                                </div>
                                <div className="order-row">
                                    <span className="order-label">Total Amount:</span>
                                    <span className="order-amount">₹{order.totalAmount}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );

}
export default Orders;