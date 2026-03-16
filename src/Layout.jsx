import { Outlet, useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faShoppingCart,
    faDrumstickBite,
    faBowlRice,
    faHome,
    faShoppingBag,
    faComment,
    faUserPlus,

    faHotel
} from '@fortawesome/free-solid-svg-icons';

function Layout() {

    // const location = useLocation();
    const hideNav = false;
    const navigate = useNavigate();

    const items = useSelector(state => state.cart.items);

    const totalQuantity = items.reduce(
        (total, item) => total + item.quantity,
        0
    );
    const [isOpen, setISOpen] = useState(false);
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));



    return (
        <>
            <div className="navbar-wrapper">

                <nav className="menu-bar">

                    <div className="logo">
                        <Link to="/">Zaika-Rasoi</Link>
                    </div>

                    <div className="nav-links">

                        <Link to="/Home">
                            <FontAwesomeIcon icon={faHome} /> Home
                        </Link>

                        <Link to="/Reastaurant">
                            <FontAwesomeIcon icon={faHotel} />Reastaurant
                        </Link>

                        <Link to="/Veg">
                            <FontAwesomeIcon icon={faBowlRice} /> Veg Items
                        </Link>

                        <Link to="/Nonveg">
                            <FontAwesomeIcon icon={faDrumstickBite} /> NonVeg Items
                        </Link>

                        <Link to="/Contact">
                            <FontAwesomeIcon icon={faComment} /> Contact
                        </Link>

                        <Link to="/Cart">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            Cart ({totalQuantity})
                        </Link>

                        <Link to="/Orders">
                            <FontAwesomeIcon icon={faShoppingBag} /> Orders
                        </Link>

                        {loggedUser ? (
                            <>

                                <button onClick={() => {
                                    setISOpen(!isOpen)

                                }} style={{ color: 'White', backgroundColor: 'red' }}>👤 {loggedUser.name}</button>

                                {isOpen && <>
                                    <div style={{
                                        position: 'relative',
                                        top: '100%',     // Places it directly below the button
                                        right: 0,        // Aligns it to the right edge

                                        marginTop: '8px',
                                        backgroundColor: 'greenyellow',
                                        boxShadow: '0px 8px 16px rgba(0,0,0,0.1)', // Nice shadow
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        display: 'flex',
                                        flexDirection: 'column', // Stacks items vertically
                                        minWidth: '150px',
                                        overflow: 'hidden',
                                        zIndex: 1000     // Ensures it stays on top of everything
                                    }}>
                                        <button onClick={() => {
                                            navigate("/user/{loggedUser.name}")
                                        }} style={{ fontSize: "20px", fontFamily: "-apple-system", color: 'black', backgroundColor: 'goldenrod' }}>View Profile</button>



                                        <button
                                            onClick={() => {
                                                localStorage.removeItem("loggedInUser");

                                                navigate("/Home");
                                            }}
                                            style={{
                                                backgroundColor: "goldenrod",
                                                border: "none",
                                                padding: "6px 14px",
                                                borderRadius: "6px",
                                                color: "red",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                                marginLeft: "10px",
                                                transition: "0.3s"
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                                }
                            </>
                        ) : (
                            <>
                                <Link to="/Register">
                                    <FontAwesomeIcon icon={faUserPlus} /> Register
                                </Link>

                                <Link to="/Login">Login</Link>
                            </>
                        )}

                    </div>
                    <Link to="/Addition" >Addition</Link>

                </nav>




            </div>

            <div className={`page-content ${hideNav ? "full" : ""}`}>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;