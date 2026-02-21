import React from "react";
import "./home.css";
import HeroSection from "./HeroSection";
import Highlight from "./Highlight";
import Features from "./Features";

function Home() {
    return (
        <>
            <h1 id='h1'>Food-Web</h1>
            <div className="home">
                <h1>Food Menu Application</h1>
                <p>
                    Browse delicious Veg and Non-Veg dishes using the menu above.
                    Select a category from the navigation bar to explore full menu items.
                </p>

                <div className="highlight-box">
                    <h2>🍽️ What You’ll Find</h2>
                    <ul>
                        <li>✔ Variety of Veg & Non-Veg dishes</li>
                        <li>✔ Price details for each item</li>
                        <li>✔ Clean card-based UI</li>
                    </ul>
                </div>
            </div>

            {/* <HeroSection /> */}
            <Highlight />
            <Features />
        </>
    );
}

export default Home;