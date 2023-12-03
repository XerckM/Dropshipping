import React, { useState } from "react";
import authService from "../../services/authService";

export const Register = () => {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await authService.register(userData);
        if (response.success) {
        alert("Registration successful");
        } else {
        // Handle error, show message to user
        console.error(response.message);
        alert(response.message);
        }
    };

    return (
        <div className="form-container sign-up-container">
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
            type="text"
            name="firstname"
            className="signup-input"
            value={userData.firstname}
            onChange={handleInputChange}
            placeholder="First Name"
            required
            />
            <input
            type="text"
            name="lastname"
            className="signup-input"
            value={userData.lastname}
            onChange={handleInputChange}
            placeholder="Last Name"
            required
            />
            <input
            type="email"
            name="email"
            className="signup-input"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            />
            <input
            type="text"
            name="mobile"
            className="signup-input"
            value={userData.mobile}
            onChange={handleInputChange}
            placeholder="Mobile"
            />
            <input
            type="password"
            name="password"
            className="signup-input"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            />
            <button type="submit">Register</button>
        </form>
        </div>
    );
};