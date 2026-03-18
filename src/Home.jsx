import React from "react";
import "./home.css";

function Home() {
    return (
        <>

            <div className="home">
                <div> <h1 >Food-Web</h1>
                    <h1>Food Menu Application</h1>
                    <p>
                        Browse delicious Veg and Non-Veg dishes using the menu above. <br />
                        Select a category from the navigation bar to explore full menu items.
                    </p></div>

                <div className="highlight-box">

                    <h2>What You will Find</h2>
                    <ul>
                        <li>✔ Variety of Veg & Non-Veg dishes</li>
                        <li>✔ Price details for each item</li>
                        <li>✔ Clean card-based UI</li>
                    </ul>
                </div>
            </div>

        </>
    );
}

export default Home;