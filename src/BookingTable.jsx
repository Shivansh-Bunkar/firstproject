import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTable } from "@fortawesome/free-solid-svg-icons";
import "./BookingTable.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBooking } from "../Backend/BookingSlice";

function BookingTable() {

    const tablesData = [
        { id: 1, type: "Couple", capacity: 2, location: "Window", privacy: "High" },
        { id: 2, type: "Family", capacity: 6, location: "Center", privacy: "Medium" },
        { id: 3, type: "Friends", capacity: 4, location: "Front", privacy: "Low" },
        { id: 4, type: "Couple", capacity: 2, location: "Corner", privacy: "High" },
        { id: 5, type: "Family", capacity: 6, location: "Window", privacy: "High" },
        { id: 6, type: "Friends", capacity: 4, location: "Center", privacy: "Medium" },
        { id: 7, type: "Couple", capacity: 2, location: "Front", privacy: "Low" },
        { id: 8, type: "Family", capacity: 6, location: "Corner", privacy: "High" }
    ];

    const [selectedTables, setSelectedTables] = useState([]);
    const [bookedTables, setBookedTables] = useState([]);
    const [people, setPeople] = useState(2);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"))
    // ✅ Selection logic
    const handleSelect = (table) => {
        const isBooked = bookedTables.some(t => t.id === table.id);
        if (isBooked) return; // ❌ prevent selecting booked table

        const exists = selectedTables.find((t) => t.id === table.id);

        if (exists) {
            setSelectedTables(prev => prev.filter((t) => t.id !== table.id));
        } else {
            setSelectedTables(prev => [...prev, table]);
        }
    };

    const handleCancelBooking = (id) => {
        setBookedTables(prev => prev.filter(t => t.id !== id));
        toast.success("Booking Cancelled");
    };

    return (
        <div className="booking-container">
            <h2>Book Your Table</h2>

            <div className="people-select">
                <label>Select People: </label>
                <select onChange={(e) => setPeople(Number(e.target.value))}>
                    <option value={2}>2 People</option>
                    <option value={4}>4 People</option>
                    <option value={6}>6 People</option>
                </select>
            </div>

            <div className="table-grid">
                {tablesData.map((table) => {

                    const isSelected = selectedTables.some(t => t.id === table.id);
                    const isBooked = bookedTables.some(t => t.id === table.id);
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
                                    Table {table.id} {isBooked && <FontAwesomeIcon icon={faStar} />}
                                </h3>
                            </div>

                            <div className="card-body">
                                <p>{table.type}</p>
                                <p>{table.capacity} Persons</p>
                            </div>

                            <div className="card-footer">
                                <span>{table.location}</span>
                                <span>{table.privacy}</span>

                                {isBooked && (
                                    <button
                                        className="cancel-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCancelBooking(table.id); // ✅ correct variable
                                        }}
                                    >
                                        Cancel
                                    </button>
                                )}
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
                    selectedTables.map((t) => (
                        <p key={t.id}>
                            Table {t.id} ({t.type}, {t.capacity} persons)
                        </p>
                    ))
                )}

                <button
                    disabled={selectedTables.length === 0}
                    onClick={() => {
                        if (!loggedUser) {
                            toast.error("Please login first!");
                            return;
                        }

                        setBookedTables(prev => [...prev, ...selectedTables]);

                        dispatch(addBooking({
                            userId: loggedUser.id,   // ✅ FIXED
                            tables: selectedTables,
                            date: new Date().toLocaleString()
                        }));

                        setSelectedTables([]);

                        toast.success("Booking Confirmed!");
                    }}
                >
                    Confirm Booking
                </button>
            </div>

        </div>
    );
}

export default BookingTable;