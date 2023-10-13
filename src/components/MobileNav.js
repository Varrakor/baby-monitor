import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/MobileNav.css";

const MobileNav = () => {

    const navigate = useNavigate()
    const redirectToHome = () => {
        navigate("/")
    }

    return (
        <div className="mobile-nav-bar">
            <button className="nav-home" onClick={redirectToHome}>
                <i class="uil uil-estate home-mobile-icon"></i>
            </button>
            <button className="nav-stat ">
                <i class="uil uil-analytics home-mobile-icon"></i>
            </button>
            <button className="nav-profile">
                <i class="uil uil-user home-mobile-icon"></i>
            </button>
        </div>
    )
}

export default MobileNav;