// Features.jsx
import "./features.css";

function Features() {
    return (
        <section className="features">
            <div className="circle">
                <button className="feature-button" onClick={() => {
                    window.location.href = "https://practice-pyjr.onrender.com/"
                }}>
                    <span>💻</span>
                    <p>Projects</p>
                </button>
            </div>

            <div className="circle">
                <button className="feature-button" onClick={() => window.open("/resume.pdf", "_blank")}>
                    <span>📄</span>
                    <p>Resume</p></button>
            </div>

            <div className="circle">
                <button className="feature-button" onClick={() => window.location.href = "/contact"}>
                    <span>📞</span>
                    <p>Contact</p>
                </button>
            </div>

            <div className="circle">
                <button className="feature-button" onClick={() => window.location.href = "https://github.com/Shivansh-Bunkar"}>
                    <span>💻</span>
                    <p>GitHub</p>
                </button>
            </div>
        </section>
    );
}

export default Features;