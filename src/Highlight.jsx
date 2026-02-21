// Highlight.jsx
import "./hero.css";

function Highlight() {
    return (
        <>
            <div className="highlight">
                <button className="highlight-button" onClick={() => window.location.href = "mailto:shivansh@example.com"}>
                    🚀 Explore My Portfolio Projects
                </button>
            </div>
        </>
    );
}

export default Highlight;