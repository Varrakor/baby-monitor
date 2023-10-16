import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { useNavigate } from 'react-router-dom';
import { auth, firebaseConfig } from '../config/firebase';
import { signOut } from 'firebase/auth';
import firebase from "firebase/compat/app";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    }
  },
};

const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const Dashboard = () => {

  const [selectedStat, setSelectedStat] = useState('Temperature');
  const [user, setUser] = useState(null);


  const handleStatSelection = (stat) => {
    setSelectedStat(stat);
  };

  const navigate = useNavigate()

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperature',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Humidity',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

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

  const handleSignout = async () => {
    try {
      await signOut(auth); // Use signOut from 'firebase/auth'
      navigate('/')
    } catch (err) {
      console.error(err);
    }
  }

  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageTemperature, setAverageTemperature] = useState(null);
  const [maxHumidity, setMaxHumidity] = useState(null);
  const [temperature, setTemperature] = useState(null);
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

          // Calculate average temperature
          totalTemperature += data.temperature;

          // Find maximum humidity
          if (data.humidity > maxHumidity) {
            maxHumidity = data.humidity;
          }
        });

        const averageTemperature = totalTemperature / sensorData.length;

        setSensorData(sensorData);
        setTemperature(sensorData[0].temperature);
        setHumidity(sensorData[0].humidity)
        setAverageTemperature(averageTemperature);
        setMaxHumidity(maxHumidity);
        setLoading(false);

        const temperatureData = sensorData.map(data => data.temperature);
        const humidityData = sensorData.map(data => data.humidity);   

        setChartData(prevData => ({
          ...prevData,
          labels: sensorData.map(data => data.timestamp.toDate().toLocaleDateString()), // Assuming the timestamp can be converted to a date
          datasets: [
            {
              ...prevData.datasets[0],
              data: temperatureData
            },
            {
              ...prevData.datasets[1],
              data: humidityData
            }
          ]
        }));
      })
      .catch((error) => {
        console.error('Error fetching sensor data:', error);
        setLoading(false);
      });
  }, []);

  if (!user) {
    // User is not logged in, don't render the content
    return null;
  }

  return (
    <div className="dashboard-container">
      <div className="side-nav">
        <button className="home-nav">
          <i class="uil uil-estate nav-icon"></i>
        </button>
        <button className="stat-nav">
          <i class="uil uil-analytics nav-icon"></i>
        </button>
        <button className="profile-nav">
          <i class="uil uil-user nav-icon"></i>
        </button>
        <button className="signout-nav" onClick={handleSignout}>
          <i class="uil uil-signout nav-icon"></i>
        </button>
      </div>

      <div className="searchbar">
        <i class="uil uil-search search-icon"></i>
        <input className="search" placeholder="Search"/>
      </div>

      <div className="settings">
        <button className="settings-button">
          <i class="uil uil-setting settings-icon"></i>
        </button>
        <img className="user-icon" alt="" src="/human.png" />
      </div>

      <div className="welcome-container">
        <b className="greeting">Hi, Drax !</b>
        <div className="welcome-home">{`Welcome home! The air temperature and humid is good & fresh today.`}</div>
        <img className="cradle-family-icon" alt="" src="/Cradle-Family.png" />
        <div className="temp-value">+{temperature}°C</div>
        <div className="outdoor-temperature">Outdoor Temperature</div>
        <div className="humidity-value">{humidity}%</div>
        <div className="outdoor-humidity">Outdoor Humidity</div>
      </div>

      <div className="quick-status">
        <div className="cradle">Drax’s cradle</div>
        <img className="humidity-image" alt="" src="/humidity_uncoloured.svg" />
        <div className="status-hum-value">{humidity}%</div>
        <img className="temperature-img" alt="" src="/temperature_uncoloured.svg" />
        <div className="status-temp-value">{temperature}°C</div>
      </div>

      <div className="stat-buttons">
        <button
          className={`temperature-parent ${selectedStat === 'Temperature' ? 'selected' : ''}`}
          onClick={() => handleStatSelection('Temperature')}
        >
          <div className="temperature1">Temperature</div>
          <i class="uil uil-temperature-half icon"></i>
        </button>
        <button
          className={`humidity-parent ${selectedStat === 'Humidity' ? 'selected' : ''}`}
          onClick={() => handleStatSelection('Humidity')}
        >
          <div className="humidity">Humidity</div>
            <i class="uil uil-tear icon"></i>
        </button>
        <button
          className={`image-parent ${selectedStat === 'Image' ? 'selected' : ''}`}
          onClick={() => handleStatSelection('Image')}
        >
         <div className="image">Image</div>
          <i class="uil uil-camera icon"></i>
        </button>
        <button
          className={`sound-parent ${selectedStat === 'Sound' ? 'selected' : ''}`}
          onClick={() => handleStatSelection('Sound')}
        >
          <div className="sound">Sound</div>
          <i class="uil uil-microphone icon"></i>
        </button>
      </div>

      <div className="stat-details">
        {selectedStat === 'Temperature' && (
            <>
              <i class="uil uil-temperature-half temperature-icon"></i>
              <div className="cradle-temperature">Cradle Temperature</div>
              <div className="indicator-value">{temperature}</div>
            </>
        )}
        {selectedStat === 'Humidity' && (
            <>
              <i class="uil uil-tear temperature-icon"></i>
              <div className="cradle-temperature">Cradle Humidity</div>
              <div className="indicator-value">{humidity}</div>
            </>
        )}
        {selectedStat === 'Image' && (
          <>
            <i class="uil uil-camera icon temperature-icon"></i>
            <div className="cradle-temperature">Cradle Images</div>
            <div className="image-gallery">
              {sensorData.slice(0, 3).map(data => (
                <img key={data.photo_url} src={data.photo_url} alt="Sensor Data" className="sensor-image" />
              ))}
            </div>
          </>
        )}
        <button className="arrow-button">
          <i class="uil uil-arrow-right arrow-right-icon"></i>
        </button>
        {(selectedStat === 'Temperature' || selectedStat === 'Humidity') && (
          <img className="indicator-img" alt="" src="/indicator.svg" />
        )}
        
      </div>

      
      <div className="details-container">
        <div className="members-div">
          <span className="members">Members</span>
          <button className="member-arrow-button">
            <i class="uil uil-arrow-right member-arrow-icon"></i>
          </button>
          <div className="member-details">
            <img className="member1" alt="" src="/human.png" />
            <div className="dad">Dad</div>
            <img className="member2" alt="" src="/human.png" />
            <div className="dad1">Dad</div>
            <img className="member3" alt="" src="/human.png" />
            <div className="dad2">Dad</div>
          </div>
        </div>
          
        <div className="statistics-div">
          <span className="statistics">Statistics</span>
          <button className="statistics-arrow-button">
            <i class="uil uil-arrow-right statistics-arrow-icon"></i>
          </button>
          <div className="statistics-chart">
            <Line options={options} data={chartData} width={800} height={400}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
