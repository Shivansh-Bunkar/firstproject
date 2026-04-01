import { useState } from "react";
import "./style/contact.css";
function Contact() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.message) {
            alert("All fields are required");
            return;
        }

        try {
            // change URL if your backend differs
            const res = await fetch("http://localhost:8080/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                alert("Message sent successfully!");
                setForm({ name: "", email: "", message: "" });
            } else {
                alert("Failed to send message");
            }
        } catch (err) {
            alert("Server error");
        }
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                />

                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default Contact;