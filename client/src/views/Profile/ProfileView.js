import React, { useState } from 'react';
import authService from "../../services/authService";

export const ProfileView = () => {
    const storedData = JSON.parse(localStorage.getItem("user"));
    const [userData, setUserData] = useState({
        firstname: storedData.firstname || "",
        lastname: storedData.lastname || "",
        email: storedData.email || "",
        mobile: storedData.mobile || "",
    });
    const [message, setMessage] = useState(null);

    const handleInputChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await authService.update(userData);
        if (response.success === true ) {
        } else {
            console.error(response.message)
        }
    }
    return(
        <div className="profile-container" >
            <h1>Profile</h1>
            <form className="profile-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstname"
                    className="profile-input"
                    value={userData.firstname}
                    onChange={handleInputChange}
                    />
                <input
                    type="text"
                    name="lastname"
                    className="profile-input"
                    value={userData.lastname}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    className="profile-input"
                    value={userData.email}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="mobile"
                    className="profile-input"
                    value={userData.mobile}
                    onChange={handleInputChange}
                />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}