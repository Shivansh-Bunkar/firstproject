import { Outlet, useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faDrumstickBite, faBowlRice, faHome, faShoppingBag, faComment } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Layout = () => {
    const location = useLocation();
    const [hideNav, setHideNav] = useState(false);


    const items = useSelector(state => state.cart.items);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        setHideNav(isMobile && location.pathname !== "/");
    }, [location]);



    return (
        <>
            <div className={`navbar-wrapper ${hideNav ? "hide" : ""}`}>
                <div className='menu-bar'>
                    <div className='logo'><Link to="/">Zaika-Rasoi</Link></div>
                    <Link to="/Home"><FontAwesomeIcon icon={faHome} /> Home</Link>
                    <Link to="/Veg"><FontAwesomeIcon icon={faBowlRice} /> Veg-Items</Link>
                    <Link to="/Nonveg"><FontAwesomeIcon icon={faDrumstickBite} /> NonVeg-Items</Link>
                    <Link to="/Contact">
                        <FontAwesomeIcon icon={faComment} />Contact Us</Link>
                    <Link to="/Cart">
                        <FontAwesomeIcon icon={faShoppingCart} /> Cart {totalQuantity}
                    </Link>
                    <Link to="/Orders">
                        <FontAwesomeIcon icon={faShoppingBag} /> Orders
                    </Link>
                    <Link to="/Register"><FontAwesomeIcon icon={faUserPlus} />Register</Link>
                </div>
            </div>

            <div className={`page-content ${hideNav ? "full" : ""}`}>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;