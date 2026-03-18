import React from 'react'
import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Contact from "./Contact";
import Cart from './cart';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import Layout from './Layout';
import Orders from './Orders';
import Register from './Register';
import Login from './Login';
import UserDashboard from './UserDashboard';
import Addition from './Addition';
import RestaurantList from './RestaurantList';
import BookingTable from './BookingTable';

function App() {
  return (
    <>
      <BrowserRouter>

        <Toaster position="top-right" reverseOrder={false} />

        <Routes>

          {/* Layout wrapper */}
          <Route element={<Layout />}>

            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Reastaurant" element={<RestaurantList />} />
            <Route path="/Veg" element={<Veg />} />
            <Route path="/Nonveg" element={<Nonveg />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/user/:id" element={<UserDashboard />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Addition" element={<Addition />} />
            <Route path="/BookingTable" element={<BookingTable />} />


          </Route>

        </Routes>

        <Footer />

      </BrowserRouter>
    </>
  )
}

export default App;