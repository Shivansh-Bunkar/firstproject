import { useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./style/userDashboard.css";

function UserDashboard() {

    const bookings = useSelector(state => state.booking.bookings);
    const [message, setMessage] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const loggedUser = location.state?.loggedUser;
    const items = useSelector(globalState => globalState.cart.items);
    const booking = useSelector(globalState => globalState.tableBooking.tableBookings);
    const orders = useSelector(state => state.order);
    const userBookings = bookings.filter(
        b => Number(b.userId) === Number(loggedUser?.id)
    );


    if (!loggedUser) {
        return <h2>Please login first</h2>;
    }

    return (
        <div className="dashboard"> {/* Changed back to 'dashboard' */}

            {/* Sidebar Navigation */}
            <div className="sidebar">
                <h3>{loggedUser.name}</h3>
                <ul>
                    <li>
                        <button onClick={() => toast.success(`This is yourProfile: ${loggedUser.name}`)}>
                            👤 Profile
                        </button>
                    </li>
                    <li>
                        <button onClick={() => items.length === 0
                            ? toast.error("Your cart is empty!")
                            : navigate("/Cart", { state: { items } })}>
                            🛒 Cart ({items.length})
                        </button>
                    </li>
                    <li>
                        <button onClick={() => toast.error("Settings coming soon!")}>
                            ⚙️ Settings
                        </button>
                    </li>
                    <li>
                        <button onClick={() => {
                            toast.success("Navigating to Bookings...");
                            setMessage(true);
                        }}>
                            📅 My Bookings
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="dashboard-content">
                {/* The Green Welcome Box */}
                <div className="welcome-header" style={{ marginBottom: '20px' }}>
                    <h2>Welcome back, {loggedUser.name}! ✨</h2>
                    <p>User ID: {id}</p>
                    <p>Manage your orders and dairy preferences here.</p>
                </div>

                {/* Delivery Tracking Section */}
                <div className="dashboard-section">
                    <h3>Track Your Last Delivery 🚚 :</h3><hr />
                    <div className="tracking-card">
                        {orders.length > 0 ? (
                            <>
                                <p>
                                    <strong>Last Order ID:</strong> #
                                    {String(orders[orders.length - 1].orderId).slice(-6).toUpperCase()}
                                </p>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: '75%' }}></div>
                                </div>
                            </>
                        ) : (
                            <p>No active deliveries found.</p>
                        )}
                    </div>
                </div>
                <br />


                {/* Orders History Section */}
                <div className="dashboard-section">
                    <h3>Your Recent Orders:</h3>
                    <hr />
                    {orders.length === 0 ? (
                        <p>No bookings yet. Check out our fresh milk products!</p>
                    ) : (
                        <div className="order-list">
                            {orders.slice().reverse().map((order) => (
                                <div key={order.orderId} className="order-card" style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                                    <p><strong>Date:</strong> {order.date} | <strong>Total:</strong> ₹{order.totalAmount}</p>
                                    <p style={{ fontSize: '12px', color: '#666' }}>ID: {order.orderId}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {message && (
                <div className="toast-box">
                    🛒 Loading your bookings...
                </div>
            )}
        </div>

    );

}

export default UserDashboard;