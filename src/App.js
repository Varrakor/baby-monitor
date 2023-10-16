import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Auth } from './components/auth';
import { Home }from './components/home';
import { auth } from './config/firebase';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import HomeMobile from './pages/HomeMobile';
import SignUpMobile from './pages/SignupMobile';
import LoginMobile from './pages/LoginMobile';
import DashboardMobile from './pages/DashboardMobile';
import { Analytics } from './components/analytics'; 

import './App.css';

function App() {
  const user = auth.currentUser;
  console.log(user)

  let mobile = false

  if(window.navigator.userAgent.match(/Mobile/i)) {
    mobile = true
  }

  return (
   <>
    {mobile !== true && (
       <Router>
       <div className="App">
         <Routes>
             <Route path="/" element={<Login />} />
             <Route path="/auth" element={<Auth />} />
             <Route path="/home" element={<Home />} />
             <Route path="/signup" element={<Signup />} />
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/analytics" element={<Analytics />} />
         </Routes>
       </div>
     </Router>
    )}
    {mobile === true && (
      <Router>
        <div className='App'>
          <Routes>
            <Route path="/" element={<HomeMobile />} />
            <Route path="/signup" element={<SignUpMobile />} />
            <Route path="/login" element={<LoginMobile />} />
            <Route path="/dashboard" element={<DashboardMobile />} />
          </Routes>
        </div>
      </Router>
    )}
   </>
  );
}

export default App;