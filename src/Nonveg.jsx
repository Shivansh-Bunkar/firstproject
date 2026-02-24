import React from 'react'
import './nonveg.css'
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import toast from 'react-hot-toast';


function Nonveg() {

    const dispatch = useDispatch();

    const nonVegItems = [
        { id: 26, name: "Butter Chicken", image: "Butter.jpg", price: 250, description: "Rich and creamy chicken curry cooked with butter and spices." },
        { id: 27, name: "Chicken Biryani", image: "Chicken-Biryani.jpg", price: 300, description: "Fragrant basmati rice layered with spicy marinated chicken." },
        { id: 28, name: "Tandoori Chicken", image: "Tandoori-chicken.jpg", price: 200, description: "Chicken marinated in yogurt and spices, roasted in tandoor." },
        { id: 29, name: "Fish Curry", image: "Fish-curry.jpg", price: 220, description: "Spicy and tangy fish cooked in traditional curry gravy." },
        { id: 30, name: "Egg Curry", image: "Egg-curry.jpg", price: 150, description: "Boiled eggs simmered in a flavorful onion-tomato gravy." },

        { id: 31, name: "Mutton Curry", image: "Mutton-curry.jpg", price: 350, description: "Tender mutton pieces cooked in rich spicy gravy." },
        { id: 32, name: "Chicken Korma", image: "chicken-korma.jpg", price: 280, description: "Creamy mildly spiced chicken curry with nuts." },
        { id: 33, name: "Prawn Masala", image: "prawn-masala.jpg", price: 320, description: "Juicy prawns cooked in tangy and spicy masala." },
        { id: 34, name: "Chicken Tikka Masala", image: "chicken-tikka-masala.jpg", price: 300, description: "Grilled chicken cubes in rich creamy tomato gravy." },
        { id: 35, name: "Keema Curry", image: "keema-curry.jpg", price: 270, description: "Minced meat cooked with spices and peas." },
        { id: 36, name: "Grilled Fish", image: "grilled-fish.jpg", price: 280, description: "Fish fillet marinated and grilled to perfection." },
        { id: 37, name: "Chicken Saagwala", image: "chicken-saagwala.jpg", price: 260, description: "Chicken cooked with fresh spinach and spices." },
        { id: 38, name: "Mutton Biryani", image: "Mutton-biriyani.jpg", price: 380, description: "Layered aromatic rice with tender mutton pieces." },
        { id: 39, name: "Egg Bhurji", image: "egg-bhurji.jpg", price: 140, description: "Scrambled eggs cooked with onions,tomatoes and spices" },
        { id: 40, name: "Fish Fry", image: "fish-fry.jpg", price: 240, description: "Crispy fried fish with tangy masala coating." },
        { id: 41, name: "Chicken Chettinad", image: "chicken-chettinad.jpg", price: 290, description: "Spicy South Indian chicken curry with aromatic spices." },
        { id: 42, name: "Prawn Curry", image: "prawn-curry.jpg", price: 330, description: "Succulent prawns cooked in coconut-based gravy." },
        { id: 43, name: "Mutton Rogan Josh", image: "mutton-rogan-josh.jpg", price: 360, description: "Aromatic Kashmiri mutton curry in rich gravy." },
        { id: 44, name: "Chicken Vindaloo", image: "chicken-vindaloo.jpg", price: 300, description: "Spicy Goan-style chicken curry with tangy flavors." },
        { id: 45, name: "Fish Tikka", image: "fish-tikka.jpg", price: 290, description: "Grilled fish marinated in spices and yogurt." }
    ];
    return (
        <>
            <h1>This is The Non-Veg Page</h1>
            <div className="nonveg-items">
                {nonVegItems.map(item => (
                    <div key={item.id} className="nonveg-item">
                        <img src={item.image} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>Price: ₹{item.price}</p>
                        <p>{item.description}</p>
                        <button
                            onClick={() => {
                                dispatch(addToCart(item));

                                toast.success(`${item.name} added to cart!`, {
                                    duration: 2000,
                                    style: {
                                        fontSize: "25px",
                                        padding: "20px 24px",
                                        minWidth: "400px",
                                        borderRadius: "10px",
                                    },
                                    iconTheme: {
                                        primary: "#4ade80",
                                        secondary: "#fff",
                                    },
                                });
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Nonveg;