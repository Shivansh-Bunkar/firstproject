import React from 'react'
import './nonveg.css'
function Nonveg() {

    const nonVegItems = [
        {
            id: 1,
            name: "Butter Chicken",
            image: "Butter.jpg",
            price: 250,
            description: "Rich and creamy chicken curry cooked with butter and spices."
        },
        {
            id: 2,
            name: "Chicken Biryani",
            image: "Chicken-Biryani.jpg",
            price: 300,
            description: "Fragrant basmati rice layered with spicy marinated chicken."
        },
        {
            id: 3,
            name: "Tandoori Chicken",
            image: "Tandoori-chicken.jpg",
            price: 200,
            description: "Chicken marinated in yogurt and spices, roasted in tandoor."
        },
        {
            id: 4,
            name: "Fish Curry",
            image: "Fish-curry.jpg",
            price: 220,
            description: "Spicy and tangy fish cooked in traditional curry gravy."
        },
        {
            id: 5,
            name: "Egg Curry",
            image: "Egg-curry.jpg",
            price: 150,
            description: "Boiled eggs simmered in a flavorful onion-tomato gravy."
        }
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
                    </div>
                ))}
            </div>
        </>
    )
}

export default Nonveg;