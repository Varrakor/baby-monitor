import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/HomeMobile.css";

const HomeMobile = () => {

  const navigate = useNavigate()

  const handleSignup = () => {
    navigate("/signup")
  }

  const handleSigin = () => {
    navigate("/login")
  }
  return (
    <div className="home-container">
      <img
          className="home-cradle-family-icon"
          alt=""
          src="/Cradle-Family.png"
        />
      <div className="text-container">
        <b className="smart-cradle-text">Smart Baby Monitor</b>
        <div className="subtext-container">
          <p className="subtext">{`Click down below and start `}</p>
          <p className="subtext">the smart baby care journey!</p>
        </div>
      </div>
      <button className="button-primary" onClick={handleSigin}>
        <div className="button-text">Sign In</div>
      </button>
      <button className="button-secondary" onClick={handleSignup}>
        <div className="button-secondary-text">Create account</div>
      </button>
    </div>
  );
};

export default HomeMobile;