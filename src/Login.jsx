import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import toast from 'react-hot-toast';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Login() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitLogics = async (loginData) => {
        setLoading(true);

        try {
            // Updated to fetch from your MongoDB backend API
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const result = await res.json();

            if (res.ok) {
                // If your backend returns a user object and token
                localStorage.setItem("loggedInUser", JSON.stringify(result.user));
                toast.success(`Welcome back! Login successful 🎉`);
                navigate(`/user/${result.user._id}`);
                reset();
            } else {
                alert(result.message || "Invalid Email or Password");
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong with the server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit(submitLogics)} className="login-card">
                <h2 className="login-title">Login</h2>

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="error-text">{errors.email.message}</p>}

                {/* Password Input with Toggle (Matches Register Style) */}
                <div className="password-container">
                    <FontAwesomeIcon icon={faLock} />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", { required: "Password is required" })}
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={() => setShowPassword(!showPassword)}
                        className="toggle-icon"
                    />
                </div>
                {errors.password && <p className="error-text">{errors.password.message}</p>}

                <button className="login-btn" type='submit' disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;
