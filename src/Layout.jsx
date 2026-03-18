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

    faUser
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
                        <Link to="/">Zaika-Rasoi</Link>
                    </div>

                    <div className="nav-links">
                        <Link to="/Home">
                            <FontAwesomeIcon icon={faHome} /> Home
                        </Link>

                        <Link to="/Reastaurant">
                            <FontAwesomeIcon icon={faHotel} /> Restaurant
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
                            <FontAwesomeIcon icon={faShoppingCart} /> Cart ({totalQuantity})
                        </Link>

                        <Link to="/Orders">
                            <FontAwesomeIcon icon={faShoppingBag} /> Orders
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
                                <Link to="/Register"><FontAwesomeIcon icon={faUserPlus} /> Register</Link>
                                <Link to="/Login"> <FontAwesomeIcon icon={faUser} /> Login</Link>
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
