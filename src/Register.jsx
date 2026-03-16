import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Register() {
    const { register, handleSubmit, reset } = useForm();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    let submitLogics = (data) => {

        const newUser = {
            id: Date.now(),   // unique id
            ...data
        };

        let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const isDuplicate = existingUsers.some(user => user.email === data.email);
        if (isDuplicate) {
            alert("User with this email already exists!");

            return;
        }

        existingUsers.push(data);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        alert("Registration Successful!");
        navigate("/Login");
        reset();
    };

    return (
        <>
            <form onSubmit={handleSubmit(submitLogics)} className='form-container' >
                <div className='card-form'>
                    <input
                        type="text"
                        placeholder="name"
                        {...register("name", { required: true })}
                    />
                    <br />
                    {/* Password with toggle */}
                    <div className="password-container">
                        <FontAwesomeIcon icon={faLock} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            onClick={() => setShowPassword(!showPassword)}
                            className="toggle-icon"
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="email"
                        {...register("email", { required: true })}
                    />
                    <br />
                    <input
                        type="number"
                        placeholder="number"
                        {...register("number", { required: true })}
                    />
                    <br />
                    <button type='submit'>Register</button>
                    <br />

                </div>
            </form>
        </>
    )
}

export default Register;
