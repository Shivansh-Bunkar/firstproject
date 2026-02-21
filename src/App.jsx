import React from 'react'
import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import './App.css'
// import Contact from './Contact';
import Cart from './cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faDrumstickBite, faBowlRice, faHome } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
function App() {

  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);


  return (
    <>

      <BrowserRouter>
        <div className='menu-bar'>
          <div className='logo'><Link to="/">Zaika-Rasoi</Link></div>
          <Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link>
          <Link to="/Veg"><FontAwesomeIcon icon={faBowlRice} /> Veg-Items</Link>
          <Link to="/Nonveg"><FontAwesomeIcon icon={faDrumstickBite} /> NonVeg-Itmes</Link>
          {/* <Link to="/Contact">Contact Us</Link> */}
          <Link to="/Cart"><FontAwesomeIcon icon={faShoppingCart} /> Cart {totalQuantity} </Link>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />   {/* default */}
          <Route path="/Home" element={<Home />} />
          <Route path="/Veg" element={<Veg />} />
          <Route path="/Nonveg" element={<Nonveg />} />
          {/* <Route path="/Contact" element={<Contact />} /> */}
          <Route path="/Cart" element={<Cart />} />
        </Routes>


      </BrowserRouter >
    </>
  )
}

export default App;