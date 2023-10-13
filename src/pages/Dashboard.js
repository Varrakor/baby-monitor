import React, { useState } from "react";
import "../styles/Dashboard.css";
import { useNavigate } from 'react-router-dom';
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
export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [24, 25, 27, 32, 20, 32, 36, 28, 22, 19, 23, 31],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [26, 27, 29, 34, 22, 34, 38, 30, 24, 21, 25, 33],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const Dashboard = () => {

  const [selectedStat, setSelectedStat] = useState('Temperature');

  const handleStatSelection = (stat) => {
    setSelectedStat(stat);
  };

  const navigate = useNavigate()

  const handleSignout = () => {
    navigate('/')
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
        <div className="temp-value">+25°C</div>
        <div className="outdoor-temperature">Outdoor Temperature</div>
        <div className="humidity-value">30 %</div>
        <div className="outdoor-humidity">Outdoor Humidity</div>
      </div>

      <div className="quick-status">
        <div className="cradle">Drax’s cradle</div>
        <img className="humidity-image" alt="" src="/humidity_uncoloured.svg" />
        <div className="status-hum-value">30%</div>
        <img className="temperature-img" alt="" src="/temperature_uncoloured.svg" />
        <div className="status-temp-value">25°C</div>
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
              <div className="indicator-value">25</div>
            </>
        )}
        {selectedStat === 'Humidity' && (
            <>
              <i class="uil uil-tear temperature-icon"></i>
              <div className="cradle-temperature">Cradle Humidity</div>
              <div className="indicator-value">30</div>
            </>
        )}
        <button className="arrow-button">
          <i class="uil uil-arrow-right arrow-right-icon"></i>
        </button>
        <img className="indicator-img" alt="" src="/indicator.svg" />
        
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
            <Line options={options} data={data} width={800} height={400}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
