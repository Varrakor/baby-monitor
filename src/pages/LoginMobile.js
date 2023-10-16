import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase'; // Import auth and googleProvider
import { signInWithPopup } from 'firebase/auth'; // Import signInWithPopup and signOut
import "../styles/LoginMobile.css";

const LoginMobile = () => {

    const navigate = useNavigate()
    const signInWithGoogle = async () => {
        try {
          await signInWithPopup(auth, googleProvider);
          // Redirect to /home after successful login
          console.log("navigating to home")
          navigate('/dashboard');
        } catch (err) {
          console.log("Login failed")
          console.error(err);
        }
      };

    return (
        <div className="login-container">
            <b className="welcome-text">Hi, Welcome!</b>
            <div>
                <div className="email-login-mobile">
                    <span className="text">Email address</span>
                    <input className="login-input-field" placeholder="Email" />
                </div>
                <div className="password-login-mobile">
                    <span className="text">Password</span>
                    <input className="login-input-field" type="password" placeholder="Password" />
                </div>

                <div className="remember-me-container">
                    <input type="checkbox" className="checkbox-remember-me" />
                    <div className="remember-me-text">Remember me</div>
                </div>
            </div>

            <button className="login-mobile-primary-button">
                <span className="login-button-text">Log in</span>
            </button>

            <div>
                <div className="or-with-text">Or with</div>
                <div className="right-line" />
                <div className="left-line" />
            </div>

            <div>
                <div className="button-with-apple-icon-mobile">
                <img
                    className="social-icon-apple-mobile"
                    alt=""
                    src="/AppleIcon.svg"
                />
                <div className="icon-text-mobile"> Apple</div>
                </div>
                <div className="button-with-google-icon-mobile">
                    <div className="social-icon-google-group-mobile" onClick={signInWithGoogle}>
                        <img className="google-icon-mobile" alt="" src="/GoogleIcon.svg" />
                        <div className="icon-text">Google</div>
                    </div>
                </div>
            </div>

            <div className="signup-mobile">
                Don't have an account? <Link className="terms-mobile" to="/signup">Create Account</Link>
            </div>
        </div>
    )
}

export default LoginMobile;