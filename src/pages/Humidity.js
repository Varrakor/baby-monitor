import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileNav from "../components/MobileNav";
import { auth, firebaseConfig } from '../config/firebase';
import firebase from "firebase/compat/app";
import "../styles/Temperature.css";

const Humidity = () => {
    
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

    const handleBackArrow = () => {
        navigate("/dashboard")
    }

    const [sensorData, setSensorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [humidity, setHumidity] = useState(null);

    useEffect(() => {
        // Initialize Firebase with your Firebase configuration
        firebase.initializeApp(firebaseConfig);
        // Access Firestore
        const db = firebase.firestore();
        // Fetch sensor data from Firestore
        db.collection('sensor_data')
          .get()
          .then((querySnapshot) => {
            const sensorData = [];
            let totalTemperature = 0;
            let maxHumidity = 0;
    
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              sensorData.push(data);
            });
    
            setSensorData(sensorData);
            let length = sensorData.length
            setHumidity(sensorData[length - 1].humidity);
            setLoading(false);  
    
          })
          .catch((error) => {
            console.error('Error fetching sensor data:', error);
            setLoading(false);
          });
      }, []);
    
    return (
        <div className="temperature-mobile">
            <button className="arrow-button-mobile" onClick={handleBackArrow}>
                <i class="uil uil-arrow-left left-arrow"></i>
            </button>
            <span className="temperature-heading">Humidity</span>
            <div>
                <div className="image-container">
                    <img src="./humidity-indicator.png" className="half-image-left" alt="Description" />
                </div>
                <div className="temperature-mobile-display">{humidity}%</div>
            </div>
            <MobileNav />
        </div>
    );
};

export default Humidity;
