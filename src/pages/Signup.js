import React from "react";
import "../styles/Signup.css";
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

const Signup = () => {

  const navigate = useNavigate()

  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Successfully signed up with Google");
      navigate('/dashboard');
    } catch (err) {
      console.log("Google sign-up failed");
      console.error(err);
    }
  };

  return (
    <div className="signup-screen-container">
      <div className="signup-left-container">
        <div className="signup-about-us">About us</div>
        <div className="signup-contact">Contact</div>
        <img
          className="signup-cradle-family-icon"
          alt=""
          src="/Cradle-Family.png"
        />
        <img className="signup-star-icon" alt="" src="/object.svg" />
      </div>
      <div className="signup-form-container">
        <b className="signup-top-text">Smart Baby Monitor</b>
        <b className="signup-sub-text">Create account</b>
        <div className="signup-input4">
          <input className="input-field1" placeholder="Mobile phone" />
          <div className="error1">Error</div>
        </div>
        <div className="signup-input1">
            <input className="input-field1" placeholder="Email Address" />
          <div className="error1">Error</div>
        </div>
        <div className="signup-input2">
          <input className="input-field1" placeholder="Password" />
          <div className="error1">Error</div>
        </div>
        <div className="signup-input3">
          <input className="input-field1" placeholder="Confirm Password" />
          <div className="error1">Error</div>
        </div>
        <input type="checkbox" className="terms-and-privacy-checkbox" />
        <div className="terms-and-privacy-container">
          <span>{`I agree with `}</span>
          <span className="terms">Terms</span>
          <span>{` and `}</span>
          <span className="terms">Privacy</span>
        </div>
        <div className="signup-primary-button">
          <div className="signup-button-text">Create account</div>
        </div>
        <div className="or-with">Or with</div>
        <div className="frame-item" />
        <div className="frame-inner" />
        <div className="signup-apple-icon-button">
          <img
            className="social-icon-apple"
            alt=""
            src="/AppleIcon.svg"
          />
          <div className="icon-text"> Apple</div>
        </div>
        <div className="signup-google-icon-button">
          <div className="social-icon-google-group" onClick={signUpWithGoogle}>
            <img className="signup-google-icon" alt="" src="/GoogleIcon.svg" />
            <div className="icon-text">Google</div>
          </div>
        </div>
        <div className="login-redirect">
          <span>{`Already have an account? `}</span>
          <span><Link className="terms" to="/">Log In</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;

