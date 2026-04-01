import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "./style/BookingTable.css";

const BookingTable = ({ loggedUser }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { restaurantId } = useParams();
    const selectedRestaurant = restaurantId;

    const [people, setPeople] = useState(2);
    const [selectedTables, setSelectedTables] = useState([]);
    const [bookedTables, setBookedTables] = useState([]);

    const tableData = [
        { id: 1, type: "Couple", capacity: 2, location: "Window", privacy: "High", price: 8 },
        { id: 2, type: "Family", capacity: 6, location: "Center", privacy: "Medium", price: 12 },
        { id: 3, type: "Friends", capacity: 4, location: "Front", privacy: "Low", price: 7 },
        { id: 4, type: "Couple", capacity: 2, location: "Corner", privacy: "High", price: 8.5 },
        { id: 5, type: "Family", capacity: 6, location: "Window", privacy: "High", price: 15 },
        { id: 6, type: "Friends", capacity: 4, location: "Center", privacy: "Medium", price: 9 },
        { id: 7, type: "Couple", capacity: 2, location: "Front", privacy: "Low", price: 5 },
        { id: 8, type: "Family", capacity: 6, location: "Corner", privacy: "High", price: 14 }
    ];
    // ---------------- FETCH BOOKED TABLES ----------------
    const fetchBookedTables = async () => {
        try {
            const res = await fetch(
                `http://localhost:5000/api/bookings/${selectedRestaurant}`
            );

            const data = await res.json();

            if (res.ok) {
                setBookedTables(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (selectedRestaurant) fetchBookedTables();
    }, [selectedRestaurant]);

    // ---------------- KEEP YOUR SELECT LOGIC ----------------
    const handleSelect = (table) => {

        const isBooked = bookedTables.some(
            (booking) =>
                Array.isArray(booking.tables) &&
                booking.tables.includes(table.id)
        );

        if (isBooked) return;

        const exists = selectedTables.find((t) => t.id === table.id);

        if (exists) {
            setSelectedTables(prev =>
                prev.filter((t) => t.id !== table.id)
            );
        } else {
            setSelectedTables(prev => [...prev, table]);
        }
    };

    // ---------------- CONFIRM BOOKING ----------------
    const handleConfirmBooking = async () => {
        const res = await fetch("http://localhost:5000/api/book-table", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: loggedUser?._id,
                restaurantId: selectedRestaurant,
                tables: selectedTables.map(t => t.id),
                date: new Date().toLocaleString(),
            }),
        });

        if (!res.ok) throw new Error();
    };

    return (
        <div className="booking-container">

            <h2>Book Your Table</h2>

            {/* ===== YOUR UI UNTOUCHED ===== */}
            <div className="people-select">
                <label>Select People: </label>
                <select onChange={(e) => setPeople(Number(e.target.value))}>
                    <option value={2}>2 People</option>
                    <option value={4}>4 People</option>
                    <option value={6}>6 People</option>
                </select>
            </div>

            <div className="table-grid">
                {Array.isArray(tableData) &&
                    tableData.map((table) => {

                        const isSelected = selectedTables.some(
                            t => t.id === table.id
                        );

                        const isBooked = bookedTables.some(
                            (booking) =>
                                Array.isArray(booking.tables) &&
                                booking.tables.includes(table.id)
                        );

                        const isSuitable = table.capacity >= people;

                        return (
                            <div
                                key={table.id}
                                className={`table-card 
                                    ${isSelected ? "selected" : ""} 
                                    ${isBooked ? "booked" : ""} 
                                    ${!isSuitable ? "not-suitable" : ""}
                                `}
                                onClick={() => handleSelect(table)}
                            >

                                <div className="card-header">
                                    <FontAwesomeIcon icon={faTable} />
                                    <h3>
                                        Table {table.id}{" "}
                                        {isBooked && <FontAwesomeIcon icon={faStar} />}
                                    </h3>
                                </div>

                                <div className="card-body">
                                    <p>{table.type}</p>
                                    <p>₹{table.price}</p>
                                    <p>{table.capacity} Persons</p>
                                </div>

                                <div className="card-footer">
                                    <span>{table.location}</span>
                                    <span>{table.privacy}</span>
                                </div>

                            </div>
                        );
                    })}
            </div>

            <div className="summary">
                <h3>Selected Tables:</h3>

                {selectedTables.length === 0 ? (
                    <p>None</p>
                ) : (
                    selectedTables.map(t => (
                        <p key={t.id}>
                            Table {t.id} ({t.type}, {t.capacity})
                        </p>
                    ))
                )}

                <button
                    disabled={selectedTables.length === 0}
                    onClick={() => {
                        if (!token) {
                            toast.error("Please login first!");
                            return;
                        }

                        navigate("/payment", {
                            state: { selectedTables, restaurantId: selectedRestaurant }
                        });
                    }}
                >
                    Book Now
                </button>
            </div>

        </div>
    );
};

export default BookingTable;