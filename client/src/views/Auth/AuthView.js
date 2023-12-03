import React, { useState } from "react";
import { Login } from "../../components/Auth/Login";
import { Register } from "../../components/Auth/Register";
import "./AuthView.css";

export const AuthView = () => {
  const [move, setMove] = useState(false);

  function handleMove() {
    setMove((move) => !move);
  }

  let togglePanel = move ? " right-panel-active" : "";
  return (
    <div className="auth-container">
      <div className={`container${togglePanel}`} id="container">
        <Register />
        <Login />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>Already have an account?</h2>
              <button className="ghost" onClick={handleMove} id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Don't have an account?</h2>
              <button className="ghost" onClick={handleMove} id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};