import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './style/register.css';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Register() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (data) => {
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (result.user) {
                navigate("/Login");
                reset();
            } else {
                alert(result.message);
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleRegister)} className='form-container'>
            <div className='card-form'>

                <input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p>{errors.name.message}</p>}

                <div className="password-container">
                    <FontAwesomeIcon icon={faLock} />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Minimum 6 characters"
                            }
                        })}
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={() => setShowPassword(!showPassword)}
                        className="toggle-icon"
                    />
                </div>
                {errors.password && <p>{errors.password.message}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p>{errors.email.message}</p>}

                <input
                    type="number"
                    placeholder="Phone Number"
                    {...register("number", { required: "Number is required" })}
                />
                {errors.number && <p>{errors.number.message}</p>}

                <button type='submit' disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

            </div>
        </form>
    );
}

export default Register;