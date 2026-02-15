import React from 'react'
import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import './App.css'
function App() {



  return (
    <>
      <BrowserRouter>
        <div className='menu-bar'>
          <Link to="/Home">Home</Link>
          <Link to="/Veg">Veg-Items</Link>
          <Link to="/Nonveg">NonVeg-Itmes</Link>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />   {/* default */}
          <Route path="/Home" element={<Home />} />
          <Route path="/Veg" element={<Veg />} />
          <Route path="/Nonveg" element={<Nonveg />} />
        </Routes>


      </BrowserRouter >
    </>
  )
}

export default App;