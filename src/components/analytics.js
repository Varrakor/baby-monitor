import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firebaseConfig } from '../config/firebase';
import { auth } from '../config/firebase';

export const Analytics = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageTemperature, setAverageTemperature] = useState(null);
  const [maxHumidity, setMaxHumidity] = useState(null);
  console.log("in analytics")

  useEffect(() => {
    // Initialize Firebase with your Firebase configuration
    firebase.initializeApp(firebaseConfig);

    // Access Firestore
    const db = firebase.firestore();

    // Fetch sensor data from Firestore
    db.collection('sensor_readings')
      .get()
      .then((querySnapshot) => {
        const sensorData = [];
        let totalTemperature = 0;
        let maxHumidity = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          sensorData.push(data);

          // Calculate average temperature
          totalTemperature += data.temperature;

          // Find maximum humidity
          if (data.humidity > maxHumidity) {
            maxHumidity = data.humidity;
          }
        });

        const averageTemperature = totalTemperature / sensorData.length;

        setSensorData(sensorData);
        setAverageTemperature(averageTemperature);
        setMaxHumidity(maxHumidity);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching sensor data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Analytics</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Average Temperature: {averageTemperature?.toFixed(2)}°C</p>
          <p>Maximum Humidity: {maxHumidity}%</p>
          <h3>Sensor Data</h3>
          <ul>
            {sensorData.map((data, index) => (
              <li key={index}>
                <div>Timestamp: {data.timestamp}</div>
                <div>Temperature: {data.temperature}°C</div>
                <div>Humidity: {data.humidity}%</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}