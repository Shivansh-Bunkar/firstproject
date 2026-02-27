import React from 'react'
import './veg.css'
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { useState } from 'react';
import Toast from './Toast';
import toast from 'react-hot-toast';

function Veg() {

    const dispatch = useDispatch();

    const vegItems = [
        { id: 1, name: "Paneer Butter Masala", image: "Paneer-butter.jpg", price: 250, description: "Creamy tomato-based curry with soft paneer cubes." },
        { id: 2, name: "Veg Biryani", image: "Veg-Biriyani.jpg", price: 200, description: "Aromatic basmati rice cooked with mixed vegetables and spices." },
        { id: 3, name: "Masala Dosa", image: "Masala-dosa.jpg", price: 150, description: "Crispy dosa stuffed with spiced potato filling." },
        { id: 4, name: "Chole Bhature", image: "chole-bhature.jpg", price: 180, description: "Spicy chickpea curry served with fluffy fried bread." },
        { id: 5, name: "Veg Burger", image: "Veg-burger.jpg", price: 120, description: "Burger loaded with vegetable patty, lettuce, and sauces." },

        { id: 6, name: "Palak Paneer", image: "palak-paneer.jpg", price: 230, description: "Paneer cubes cooked in creamy spinach gravy." },
        { id: 7, name: "Veg Pulao", image: "veg-pulao.jpg", price: 170, description: "Fragrant rice cooked with mixed vegetables." },
        { id: 8, name: "Aloo Paratha", image: "aloo-paratha.jpg", price: 90, description: "Stuffed flatbread filled with spiced mashed potatoes." },
        { id: 9, name: "Rajma Chawal", image: "rajma-chawal.jpg", price: 160, description: "Kidney bean curry served with steamed rice." },
        { id: 10, name: "Hakka Noodles", image: "hakka-noodles.jpg", price: 140, description: "Stir-fried noodles with vegetables and sauces." },
        { id: 11, name: "Veg Manchurian", image: "veg-manchurian.jpg", price: 180, description: "Fried veggie balls tossed in spicy Indo-Chinese gravy." },
        { id: 12, name: "Pav Bhaji", image: "pav-bhaji.jpg", price: 130, description: "Mashed vegetable curry served with buttered pav." },
        { id: 13, name: "Paneer Tikka", image: "paneer-tikka.jpg", price: 260, description: "Grilled paneer cubes marinated in spices." },
        { id: 14, name: "Veg Sandwich", image: "veg-sandwich.jpg", price: 80, description: "Toasted sandwich with fresh veggies and chutney." },
        { id: 15, name: "Idli Sambar", image: "idli-sambar.jpg", price: 100, description: "Steamed rice cakes served with sambar and chutney." },
        { id: 16, name: "Veg Fried Rice", image: "veg-fried-rice.jpg", price: 150, description: "Rice stir-fried with vegetables and soy sauce." },
        { id: 17, name: "Kadai Paneer", image: "kadai-paneer.jpg", price: 240, description: "Paneer cooked with capsicum in spicy kadai masala." },
        { id: 18, name: "Mix Veg Curry", image: "mix-veg.jpg", price: 190, description: "Seasonal vegetables cooked in rich gravy." },
        { id: 19, name: "Dhokla", image: "dhokla.jpg", price: 90, description: "Soft steamed gram flour snack with tempering." },
        { id: 20, name: "Veg Momos", image: "veg-momos.jpg", price: 120, description: "Steamed dumplings stuffed with vegetables." },
        { id: 21, name: "Tandoori Roti", image: "tandoori-roti.jpg", price: 30, description: "Whole wheat roti baked in tandoor." },
        { id: 22, name: "Malai Kofta", image: "malai-kofta.jpg", price: 260, description: "Paneer and potato dumplings in creamy gravy." },
        { id: 23, name: "Veg Pizza", image: "veg-pizza.jpg", price: 220, description: "Pizza topped with fresh vegetables and cheese." },
        { id: 24, name: "Samosa", image: "samosa.jpg", price: 25, description: "Crispy pastry filled with spicy potato mixture." },
        { id: 25, name: "Jeera Rice", image: "jeera-rice.jpg", price: 140, description: "Basmati rice flavored with cumin seeds." }
    ];

    const [showToast, setShowToast] = React.useState(false);

    return (
        <>
            <h1>Veg-Page</h1>
            {showToast && (
                <div className="toast-box">
                    🛒 Item added to cart!
                </div>
            )}

            <div className="veg-items">
                {vegItems.map(item => (
                    <div key={item.id} className="veg-item">
                        <img src={item.image} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>Price: ₹{item.price}</p>
                        <p>{item.description}</p>

                        <button
                            onClick={() => {
                                dispatch(addToCart(item));

                                toast.success(`${item.name} added to cart!`, {
                                    duration: 500,
                                    style: {
                                        progressBar: {

                                            background: "green",
                                        },
                                        background: "#3ecb72",
                                        color: "#fff",
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

export default Veg;