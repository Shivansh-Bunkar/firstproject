import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./userDashboard.css";

function UserDashboard() {

    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const bookings = useSelector(state => state.booking.bookings);
    const [message, setMessage] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    console.log("loggedUser:", loggedUser);
    console.log("bookings:", bookings);
    // const userBookings = bookings.filter((b) => {
    //     console.log("Checking:", b.userId, loggedUser?.id);
    //     return b.userId === loggedUser?.id;
    // });
    const userBookings = bookings.filter(
        b => Number(b.userId) === Number(loggedUser?.id)
    );

    // ✅ fix: use loggedUser instead of user
    // const userBookings = bookings.filter(

    //     b => b.userId === loggedUser?.id
    // );

    // ✅ safety check
    if (!loggedUser) {
        return <h2>Please login first</h2>;
    }

    return (
        <>
            <div className="dashboard">

                <div className="sidebar">
                    <h3>{loggedUser.name}</h3>

                    <ul>
                        <li>
                            <button onClick={() =>
                                toast.success(`This is the profile ${loggedUser.name}`)
                            }>
                                Profile
                            </button>
                        </li>

                        <li>
                            <button onClick={() => navigate("/Cart")}>
                                Cart
                            </button>
                        </li>

                        <li>
                            <button onClick={() => {
                                toast.success(`Settings not updated yet, ${loggedUser.name}`);

                            }
                            }>
                                Settings
                            </button>
                        </li>

                        <li>
                            {/* ❌ fixed alert issue */}
                            <button onClick={() => {
                                toast.success("Booking Success");
                                setMessage(true);
                            }
                            }>
                                Bookings
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="dashboard-content">
                    <h2>Welcome {loggedUser.name}</h2>
                    <p>User ID: {id}</p>
                    <p>This is your personal dashboard.</p>
                </div>

                <div>
                    <h2>Your Bookings</h2>
                    <hr />

                    {userBookings.length === 0 ? (
                        <p>No bookings yet</p>
                    ) : (
                        userBookings.map((b, index) => (
                            <>
                                <div key={index}>
                                    <p>Date: {b.date}</p>

                                    {b.tables.map(t => (
                                        <p key={t.id}>
                                            Table {t.id} ({t.type})
                                        </p>
                                    ))}

                                    <hr />
                                </div>

                                {message &&
                                    <div>

                                    </div>
                                }


                            </>
                        ))
                    )}
                </div>

            </div>
        </>
    )
}

export default UserDashboard;