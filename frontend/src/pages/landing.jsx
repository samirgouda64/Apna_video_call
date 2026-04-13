import React from 'react'
import "../styles/Navbar.css";
import "../styles/Landing.css";
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {

    const router = useNavigate();

    return (
  <div className="landingPageContainer">

    {/* NAVBAR */}
    <nav className="navbar">
      <div className="navHeader">
        <h2>Apna Video Call</h2>
      </div>

      <div className="navlist">
        <p onClick={() => router("/aljk23")}>Join as Guest</p>
        <p onClick={() => router("/auth")}>Register</p>

        <div className="loginBtn" onClick={() => router("/auth")}>
          Login
        </div>
      </div>
    </nav>

    {/* HERO SECTION */}
    <div className="landingMainContainer">

      <div className="heroContent">
        <h1>
          <span>Connect</span> Anytime,
          <br />
          Anywhere
        </h1>

        <p>
          High-quality video calls with friends, family, and teams —
          fast, secure, and simple.
        </p>

        <div className="ctaGroup">
          <button onClick={() => router("/auth")} className="primaryBtn">
            Get Started
          </button>

          <button onClick={() => router("/aljk23")} className="secondaryBtn">
            Join as Guest
          </button>
        </div>
      </div>

    </div>
  </div>
);
}