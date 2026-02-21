import "./footer.css";

function Footer() {




    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Column 1 */}
                <div className="footer-col">
                    <h3>Products</h3>
                    <ul>
                        <li>Retail</li>
                        <li>Food Service</li>
                        <li>Exclusive</li>
                    </ul>
                </div>

                {/* Column 2 */}
                <div className="footer-col">
                    <h3>Our Story</h3>
                    <ul>
                        <li>Mission</li>
                        <li>History</li>
                        <li>Leadership Team</li>
                        <li>Awards</li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div className="footer-col">
                    <h3>Manufacturing</h3>
                    <ul>
                        <li>Factory</li>
                        <li>Quality Assurance</li>
                        <li>Ingredients</li>
                    </ul>
                </div>

                {/* Column 4 */}
                <div className="footer-col">
                    <h3>Contact</h3>
                    <ul className="contact-info">
                        <li><strong>Name:</strong> <b>Shivansh Kumar Bunkar</b> </li>
                        <li><strong>Email:</strong> <u> <a href="mailto:shivansh@example.com"></a><i>shivanshbunkar12345@gmail.com</i> </u> </li>
                        <li><strong>Phone:</strong><b> +91 73899 59273 </b></li>
                        <li><strong>Location:</strong> <b> India, Telangana, Hyderabad </b></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} Shivansh | All Rights Reserved
            </div>
        </footer>
    );
}

export default Footer;