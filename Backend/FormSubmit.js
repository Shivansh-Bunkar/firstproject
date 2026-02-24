const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, email, message };

    try {
        const res = await fetch("http://localhost:8080/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        alert(data.message);
    }
    catch (err) {
        alert("Server error");
    }
};