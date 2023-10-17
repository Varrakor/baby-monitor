import React, { useState, useEffect } from "react";
import MobileNav from "../components/MobileNav";
import { useNavigate } from "react-router-dom";
import { auth } from '../config/firebase';
import "../styles/DashboardMobile.css";

const DashboardMobile = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        // Listen for changes in user authentication status
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            // User is signed in
            setUser(user);
          } else {
            // User is not signed in, redirect to /auth
            navigate('/');
          }
        });
    
        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      }, [navigate]);

    const handleTemperature = () => {
        navigate("/temperature")
    }

    const handleHumidity = () => {
        navigate("/humidity")
    }
  
    return (
    <div className="dashboard">
        <b className="welcome-message">Hi, {user?.displayName.split(" ")[0]}!</b>

        <div>
            <button className="temperature-wrapper" onClick={handleTemperature}>
                <span className="temperature-text">Temperature</span>
                <i class="uil uil-temperature-half icon-mobile"></i>
            </button>
            <button className="humidity-wrapper" onClick={handleHumidity}>
                <span className="humidity-text">Humidity</span>
                <i class="uil uil-tear icon-mobile"></i>
            </button>
            <button className="image-wrapper">
                <span className="image-text">Image</span>
                <i class="uil uil-camera icon-mobile"></i>
            </button>
        </div>

        <MobileNav />
    </div>
  );
};

export default DashboardMobile;
