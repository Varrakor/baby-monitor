import React from "react";
import MobileNav from "../components/MobileNav";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardMobile.css";

const DashboardMobile = () => {
  
    const navigate = useNavigate()
    const handleTemperature = () => {
        navigate("/temperature")
    }

    const handleHumidity = () => {
        navigate("/humidity")
    }
  
    return (
    <div className="dashboard">
        <b className="welcome-message">Hi, Drax!</b>

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
            <button className="sound-wrapper">
                <span className="sound-text">Sound</span>
                <i class="uil uil-microphone icon-mobile"></i>
            </button>
        </div>

        <MobileNav />
    </div>
  );
};

export default DashboardMobile;
