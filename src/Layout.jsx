import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./style/layout.css";
import {
    faShoppingCart,
    faDrumstickBite,
    faBowlRice,
    faHome,
    faShoppingBag,
    faComment,
    faUserPlus,
    faHotel,
    faUser,
    faCrown,
    faUserSecret,
    faDiamond
} from '@fortawesome/free-solid-svg-icons';
import UserDashboard from "./UserDashboard";

function Layout() {
    const navigate = useNavigate();
    const items = useSelector(state => state.cart.items);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    const [isOpen, setIsOpen] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);

    const location = useLocation();
    useEffect(() => {
        const token = localStorage.getItem("token");

        // no token → user not logged in
        if (!token) {
            setLoggedUser(null);
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/users/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                // invalid / expired token
                if (!res.ok) {
                    localStorage.removeItem("token");
                    setLoggedUser(null);
                    return;
                }

                const data = await res.json();
                setLoggedUser(data.user);

            } catch (err) {
                console.log("Error fetching user:", err);
                setLoggedUser(null);
            }
        };

        fetchUser();

    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedUser(null);
        setIsOpen(false);
        navigate("/Login");
    };

    return (
        <>
            <div className="navbar-wrapper">
                <nav className="menu-bar">

                    <div className="logo">
                        <Link to={loggedUser ? `/user/${loggedUser._id}` : "/AboutUs"}>
                            <FontAwesomeIcon icon={faCrown} style={{ color: "darkcyan" }} /> RR
                        </Link>
                    </div>

                    <div className="nav-links">
                        <Link to="/Home">
                            <FontAwesomeIcon icon={faHome} style={{ color: "gold" }} /> Home
                        </Link>

                        <Link to="/Reastaurant">
                            <FontAwesomeIcon icon={faHotel} style={{ color: "gainsboro" }} /> Restaurant
                        </Link>

                        <Link to="/MilkPage">
                            <FontAwesomeIcon icon={faDiamond} style={{ color: "white" }} /> Milky-Product
                        </Link>

                        <Link to="/Veg">
                            <FontAwesomeIcon icon={faBowlRice} style={{ color: "orangered" }} /> Veg Items
                        </Link>

                        <Link to="/Nonveg">
                            <FontAwesomeIcon icon={faDrumstickBite} style={{ color: "burlywood" }} /> NonVeg Items
                        </Link>

                        <Link to="/Contact">
                            <FontAwesomeIcon icon={faComment} style={{ color: "beige" }} /> Contact
                        </Link>



                        <Link to="/Cart">
                            <FontAwesomeIcon icon={faShoppingCart} style={{ color: "whitesmoke" }} /> Cart ({totalQuantity})
                        </Link>

                        <Link to="/Orders">
                            <FontAwesomeIcon icon={faShoppingBag} style={{ color: "brown" }} /> Orders
                        </Link>

                        {/* ✅ SAME UI, ONLY DATA SOURCE CHANGED */}
                        {loggedUser ? (
                            <div className="user-menu-container">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    style={{ backgroundColor: 'red', color: 'white' }}
                                >
                                    👤 {loggedUser.name} {isOpen ? '▲' : '▼'}
                                </button>

                                {isOpen && (
                                    <div className="user-dropdown-menu">
                                        <button
                                            className="dropdown-item"
                                            onClick={() => {
                                                navigate(`/user/${loggedUser._id}`, {
                                                    state: { loggedUser }
                                                }); setIsOpen(false);
                                            }}
                                        >
                                            View Profile
                                        </button>

                                        <div className="dropdown-divider"></div>

                                        <button
                                            className="dropdown-item logout-btn"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/Register">
                                    <FontAwesomeIcon icon={faUserPlus} style={{ color: "green" }} /> Register
                                </Link>
                                <Link to="/Login">
                                    <FontAwesomeIcon icon={faUser} style={{ color: "orange" }} /> Login
                                </Link>
                            </>
                        )}
                        <Link to="/AboutUs">
                            <FontAwesomeIcon icon={faUserSecret} style={{ color: "GrayText" }} /> About
                        </Link>
                    </div>

                </nav>
            </div>


            <div className="page-content">
                <Outlet />
            </div>

        </>
    );
}

export default Layout;