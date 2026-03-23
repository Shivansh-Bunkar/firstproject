import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.css";
import { faAddressBook, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Footer() {

    const navigate = useNavigate();


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
                        <li onClick={() => navigate("/AboutUs")}>
                            About
                        </li>
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
                        <li><strong><FontAwesomeIcon icon={faEnvelope} /> Email:</strong> <a href="mailto:shivanshbunkar12345@gmail.com">shivanshbunkar12345@gmail.com</a></li>
                        <li>
                            <strong><FontAwesomeIcon icon={faPhone} />Contact:</strong>
                            <b style={{ cursor: "pointer" }} onClick={() => {
                                navigator.clipboard.writeText("+91 9876543210");
                                alert("Number copied!");
                            }}>
                                +91 9876543210
                            </b>
                        </li>
                        <li>
                            <strong> <FontAwesomeIcon icon={faAddressBook} />Location:</strong>
                            <b>
                                <a href="https://www.google.com/maps?q=India,+Telangana,+Hyderabad" target="_blank" rel="noopener">
                                    India, Telangana, Hyderabad
                                </a>
                            </b>
                        </li>
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