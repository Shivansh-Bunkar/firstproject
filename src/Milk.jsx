import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from './CartSlice';
import toast from 'react-hot-toast';
import './style/milk.css';

function MIlk() {

    const dispatch = useDispatch();
    const milkItems = [
        { id: 1, name: "Chocolate Shake", image: "milk-chocolate.jpg", price: 250, description: "Smooth and creamy milk chocolate made from rich dairy milk." },
        { id: 2, name: "Dairy Milk", image: "dairy-milk.jpg", price: 200, description: "Classic Cadbury dairy milk chocolate with rich taste." },
        { id: 3, name: "Fresh Cream", image: "fresh-cream.jpg", price: 150, description: "Thick and fresh cream perfect for desserts and cooking." },
        { id: 4, name: "Milk Cake", image: "milk-cake.jpg", price: 180, description: "Traditional Indian sweet made from condensed milk." },
        { id: 5, name: "Milk", image: "milk.jpg", price: 120, description: "Chilled milk available in chocolate, strawberry, and vanilla flavors." },
        { id: 6, name: "Paneer", image: "paneer.jpg", price: 230, description: "Fresh homemade cottage cheese rich in protein." },
        { id: 7, name: "Butter", image: "butters.jpg", price: 170, description: "Creamy and smooth butter made from pure milk." },
        { id: 8, name: "Ghee", image: "ghee.jpg", price: 500, description: "Pure desi ghee made from cow milk." },
        { id: 9, name: "Curd (Dahi)", image: "curd.jpg", price: 80, description: "Fresh and healthy curd made from natural fermentation." },
        { id: 10, name: "Lassi", image: "lassi.jpg", price: 90, description: "Refreshing yogurt-based drink, sweet or salted." },
        { id: 11, name: "Cheese", image: "cheese.jpg", price: 300, description: "Processed cheese slices perfect for sandwiches." },
        { id: 12, name: "Buttermilk", image: "buttermilk.jpg", price: 60, description: "Light and refreshing drink made from curd." },
        { id: 13, name: "Ice Cream", image: "ice-cream.jpg", price: 120, description: "Delicious frozen dessert made from milk and cream." },
        { id: 14, name: "Milk Powder", image: "milk-powder.jpg", price: 350, description: "Instant milk powder for tea, coffee, and cooking." },
        { id: 15, name: "Condensed Milk", image: "condensed-milk.jpg", price: 200, description: "Sweetened thick milk used in desserts." },
        { id: 16, name: "Khoya", image: "khoya.jpg", price: 400, description: "Thickened milk used in Indian sweets." },
        { id: 17, name: "Rasgulla", image: "rasgulla.jpg", price: 180, description: "Soft spongy balls made from chenna soaked in syrup." },
        { id: 18, name: "Rasmalai", image: "rasmalai.jpg", price: 220, description: "Paneer discs soaked in creamy flavored milk." },
        { id: 19, name: "Shrikhand", image: "shrikhand.jpg", price: 160, description: "Sweet strained yogurt dessert with saffron and cardamom." },
        { id: 20, name: "Chocolate Milk", image: "chocolate-milk.jpg", price: 110, description: "Cold milk mixed with chocolate flavor." },
        { id: 21, name: "Strawberry Milk", image: "strawberry-milk.jpg", price: 110, description: "Milk blended with strawberry flavor." },
        { id: 22, name: "Vanilla Milkshake", image: "vanilla-milkshake.jpg", price: 150, description: "Creamy milkshake with vanilla flavor." },
        { id: 23, name: "Cold Coffee", image: "cold-coffee.jpg", price: 130, description: "Chilled coffee blended with milk and ice cream." },
        { id: 24, name: "Badam Milk", image: "badam-milk.jpg", price: 140, description: "Milk enriched with almonds and saffron." },
        { id: 25, name: "Kesar Milk", image: "kesar-milk.jpg", price: 150, description: "Warm milk flavored with saffron and dry fruits." }
    ];
    const [currentPage, setCurrentPge] = useState(1);
    const itemperpage = 8;
    const totalPage = Math.ceil(milkItems.length / itemperpage);
    const indexOfLastItem = currentPage * itemperpage;
    const indexOfFirstItem = indexOfLastItem - itemperpage;
    const [showToast, setShowToast] = React.useState(false);
    const currentItem = milkItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <h1>This is Milk Product Page</h1>
            {showToast && (
                <div className="toast-box">
                    🛒 Item added to cart!
                </div>
            )}

            <div className="milk-items">
                {currentItem.map((item, index) => (
                    <div key={index} className="milk-item">
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
                                        background: " linear - gradient(135deg, #ff7a18, #00c9a7);",
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
                        > <FontAwesomeIcon icon={faShoppingCart} />
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div >
            <div className="spec-button">
                <button onClick={() => setCurrentPge(currentPage - 1)}
                    disabled={currentPage === 1}> Previous </button>
                {
                    Array.from({ length: totalPage }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPge(index + 1)}>
                            {index + 1}
                        </button>
                    ))
                }
                <button onClick={() =>
                    setCurrentPge(currentPage + 1)}
                    disabled={currentPage === totalPage}


                > Next </button>

            </div >
        </>
    )
}

export default MIlk;