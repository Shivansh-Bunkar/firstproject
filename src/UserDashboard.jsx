import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import "./userDashboard.css";

function UserDashboard() {

    const navigate = useNavigate();

    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    const { id } = useParams();
    return (
        <>
            <div className="dashboard">
                <div className="sidebar">
                    <h3>{loggedUser.name}</h3>

                    <ul>
                        <li> <button onClick={() => toast.success(`This is the profile ${loggedUser.name}`)}>Profile</button> </li>
                        {/* <li> <button onClick={() => navigate("/Orders")}>My Orders ({totalQuantity})</button> </li> */}
                        <li> <button onClick={() => navigate("/Cart")}>Cart</button> </li>
                        <li> <button onClick={() => toast.success(`Shivansh haven't updated setting's for you Mr.${loggedUser.name} `)}> Settings</button></li>
                    </ul>
                </div>
                <div className="dashboard-content">
                    <h2>Welcome {loggedUser.name}</h2>
                    <p>User ID: {id}</p>
                    <p>This is your personal dashboard.</p>
                </div>
            </div>
        </>

    )
}

export default UserDashboard;