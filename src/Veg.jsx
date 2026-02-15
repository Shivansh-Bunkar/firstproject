import React from 'react'
import './veg.css'
function Veg() {

    const vegItems = [
        {
            id: 1,
            name: "Paneer Butter Masala",
            image: "Paneer-butter.jpg",
            price: 250,
            description: "Creamy tomato-based curry with soft paneer cubes."
        },
        {
            id: 2,
            name: "Veg Biryani",
            image: "Veg-Biriyani.jpg",
            price: 200,
            description: "Aromatic basmati rice cooked with mixed vegetables and spices."
        },
        {
            id: 3,
            name: "Masala Dosa",
            image: "Masala-dosa.jpg",
            price: 150,
            description: "Crispy dosa stuffed with spiced potato filling."
        },
        {
            id: 4,
            name: "Chole Bhature",
            image: "chole-bhature.jpg",
            price: 180,
            description: "Spicy chickpea curry served with fluffy fried bread."
        },
        {
            id: 5,
            name: "Veg Burger",
            image: "Veg-burger.jpg",
            price: 120,
            description: "Burger loaded with vegetable patty, lettuce, and sauces."
        }
    ];

    return (
        <>
            <h1>Veg-Page</h1>
            <div className="veg-items">
                {vegItems.map(item => (
                    <div key={item.id} className="veg-item">
                        <img src={item.image} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>Price: ₹{item.price}</p>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Veg;