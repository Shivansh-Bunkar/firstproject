import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import toast from 'react-hot-toast';

function Login() {

    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    let submitLogics = (loginData) => {

        let registeredUsers = JSON.parse(localStorage.getItem("users")) || [];

        const validUser = registeredUsers.find(
            (user) =>
                user.email === loginData.email &&
                user.password === loginData.password
        );

        reset();

        if (validUser) {

            localStorage.setItem("loggedInUser", JSON.stringify(validUser));

            toast.success(`Welcome ${validUser.name}! Login successful 🎉`);
            navigate("/Home");
        }
        else {
            alert("Login faill.....! Register if you are a new user.. ")
            navigate("/Register");
        }
    }

    return (
        <>
            <div className="login-page">

                <form
                    onSubmit={handleSubmit(submitLogics)}
                    className="login-card"
                >

                    <h2 className="login-title">Login</h2>

                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true })}
                    />

                    <button className="login-btn" type='submit' >
                        Login
                    </button>

                </form>

            </div>
        </>
    )
}

export default Login;