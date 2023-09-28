import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Auth } from './components/auth';
import { Home }from './components/home';
import { auth } from './config/firebase';

import './App.css';

function App() {
  const user = auth.currentUser;
  console.log(user)

  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;