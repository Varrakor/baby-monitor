import React from "react";
import { Link } from 'react-router-dom';
import "../styles/Login.css";

const Login = () => {
  return (
    <div className="login-screen-container">
      <div className="left-container">
        <div className="login-about-us">About us</div>
        <div className="login-contact">Contact</div>
        <img
          className="login-cradle-family-icon"
          alt=""
          src="/Cradle-Family.png"
        />
        <img className="login-stars-icon" alt="" src="/object.svg" />
      </div>

      <div className="login-form">
        <b className="top-text">Smart Cradle</b>
        <b className="sub-text">Hi, Welcome!</b>
        <div className="input1">
          <div className="">Email address</div>
          <input className="input-field1" placeholder="Your email" /> 
          <div className="error1">Error</div>
        </div>
        <div className="input2">
          <div className="">Password</div>
          <input className="input-field2" placeholder="Password"/>
          <div className="error1">Error</div>
        </div>
        <input type="checkbox" className="checkbox-remember" />
        <div className="remember-me">Remember me</div>
        <input type="checkbox" className="checkbox-terms" />
        <div className="terms-and-privacy">
          <span>{`I agree with `}</span>
          <span className="terms">Terms</span>
          <span>{` and `}</span>
          <span className="terms">Privacy</span>
        </div>

        <button className="primary-button">
          <span className="button-text">Log in</span>
        </button>

      <div className="seperation">
        <div className="or-with-login">Or with</div>
        <div className="right-line-item" />
        <div className="left-line-item" />
      </div>

        <div>
          <div className="button-with-apple-icon">
            <img
              className="social-icon-apple"
              alt=""
              src="/AppleIcon.svg"
            />
            <div className="icon-text"> Apple</div>
          </div>
          <div className="button-with-google-icon">
            <div className="social-icon-google-group">
              <img className="google-icon" alt="" src="/GoogleIcon.svg" />
              <div className="icon-text">Google</div>
            </div>
          </div>
        </div>

        <div className="signup">
          Don't have an account? <Link className="terms" to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
