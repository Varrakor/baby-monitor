import React from "react";
import "../styles/SignupMobile.css";

const SignUpMobile = () => {
  return (
    <div className="sign-up-container">
      <div className="family-icon-container">
        <img
          className="cradle-family-icon-signup-mobile"
          alt=""
          src="/Cradle-Family.png"
        />
      </div>
      <b className="create-account">Create account</b>
      <div>
        <div className="mobile">
            <input className="input-field" placeholder="Mobile" />
        </div>
        <div className="email">
            <input className="input-field" placeholder="Email Address" />
        </div>
        <div className="password">
            <input className="input-field" placeholder="Password" />
        </div>
        <div className="confirm-password">
            <input className="input-field" placeholder="Confirm Password" />
        </div>
      </div>
      <button className="signup-button-primary">
        <div className="signup-button-text">Create account</div>
      </button>
      <div className="terms-and-conditions-container">
        <span className="terms-and-conditions-span">
          <span>{`By creating an account or signing you agree to our `}</span>
          <span className="terms-and-conditions-text">Terms and Conditions</span>
        </span>
      </div>
    </div>
  );
};

export default SignUpMobile;
