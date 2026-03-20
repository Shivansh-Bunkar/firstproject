import React from "react";
import "./about.css";
import { useNavigate } from "react-router-dom";



function About() {
    const navigate = useNavigate();
    return (
        <div className="about-page">
            <div className="about-container">

                <h1 className="about-title">Rasoi Reserve</h1>
                <p className="about-tagline">
                    Where Taste Meets Elegance
                </p>

                <div className="about-content">
                    <p>
                        At Rasoi Reserve, we believe food is more than just a meal —
                        it is an experience crafted with passion, tradition, and
                        sophistication. Our platform connects you with the finest
                        kitchens, bringing authentic flavors and premium dining
                        straight to your doorstep.
                    </p>

                    <p>
                        From handpicked ingredients to carefully curated menus,
                        every order reflects our commitment to quality and class.
                        Whether it’s a quick bite or a special occasion, Rasoi
                        Reserve ensures every moment feels indulgent.
                    </p>

                    <p>
                        We are not just delivering food — we are delivering
                        experiences, one plate at a time.
                    </p>
                </div>

                <div className="about-highlight">
                    <div className="highlight-box" onClick={() => navigate("/Reastaurant")}>
                        <h2>🍽️ Premium Quality</h2>
                        <p>Only the best restaurants and curated menus.</p>
                    </div>

                    <div className="highlight-box" onClick={() => { navigate("/premium") }}>
                        <h2>🚀 Fast Delivery</h2>
                        <p>Experience speed without compromising quality.</p>
                    </div>

                    <div className="highlight-box" onClick={() => navigate("/Veg")} >
                        <h2>💎 Elegant Experience</h2>
                        <p>A seamless and luxurious food ordering journey.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default About;