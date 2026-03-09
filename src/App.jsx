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

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Veg" element={<Veg />} />
            <Route path="/Nonveg" element={<Nonveg />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  )
}

export default App;