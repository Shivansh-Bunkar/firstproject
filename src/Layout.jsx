import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./layout.css";
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
    faSpoon,
    faBellConcierge,
    faBellSlash,
    faCrown
} from '@fortawesome/free-solid-svg-icons';

function Layout() {
    const navigate = useNavigate();
    const items = useSelector(state => state.cart.items);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    const [isOpen, setIsOpen] = useState(false);
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        setIsOpen(false);
        navigate("/Home");
        window.location.reload(); // Refresh to update the navbar state
    };

    return (
        <>
            <div className="navbar-wrapper">
                <nav className="menu-bar">
                    <div className="logo">
                        <Link to="/AboutUs"> <FontAwesomeIcon icon={faCrown} style={{ color: "darkcyan" }} />  Rasoi-Reserve</Link>
                    </div>

                    <div className="nav-links">
                        <Link to="/Home">
                            <FontAwesomeIcon icon={faHome} style={{ color: "gold" }} /> Home
                        </Link>

                        <Link to="/Reastaurant">
                            <FontAwesomeIcon icon={faHotel} style={{ color: "gainsboro" }} /> Restaurant
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
                                                navigate(`/user/${loggedUser.name}`);
                                                setIsOpen(false);
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
                                <Link to="/Register"><FontAwesomeIcon icon={faUserPlus} style={{ color: "green" }} /> Register</Link>
                                <Link to="/Login"> <FontAwesomeIcon icon={faUser} style={{ color: "orange" }} /> Login</Link>
                            </>
                        )}

                    </div>

                    {/* <Link to="/Addition">Addition</Link> */}
                </nav>
            </div>

            <div className="page-content">
                <Outlet />
            </div>
        </>
    );
}

// Reusable style for dropdown items
const dropdownButtonStyle = {
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    fontSize: '15px',
    color: 'black',
    fontFamily: 'inherit',
    transition: '0.2s'
};

export default Layout;
