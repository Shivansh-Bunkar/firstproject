import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
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
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';

const Layout = () => {

    const location = useLocation();
    const hideNav = false;
    const navigate = usenavigate();

    const items = useSelector(state => state.cart.items);

    const totalQuantity = items.reduce(
        (total, item) => total + item.quantity,
        0
    );

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
                                <h4>Hello {loggedUser.name} 👋</h4>

                                <button
                                    onClick={() => {
                                        localStorage.removeItem("loggedInUser");
                                        window.location.reload();
                                        navigate("/");
                                    }}
                                    style={{
                                        background: "linear-gradient(90deg,red,orange,red)",
                                        border: "none",
                                        padding: "6px 14px",
                                        borderRadius: "6px",
                                        color: "white",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        marginLeft: "10px",
                                        transition: "0.3s"
                                    }}
                                >
                                    Logout
                                </button>
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

                </nav>

            </div>

            <div className={`page-content ${hideNav ? "full" : ""}`}>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
