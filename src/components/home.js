import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check user authentication status when the component mounts
  useEffect(() => {
    // Listen for changes in user authentication status
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is not signed in, redirect to /auth
        navigate('/auth');
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect is not necessary, as the useEffect will handle it
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    // User is not logged in, don't render the content
    return null;
  }

  // User is logged in, render the content
  return (
    <div>
      <header>
        <div className="logout-button">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="container">
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/analytics">Analytics</Link>
            </li>
          </ul>
        </nav>
        <main className="content">
          <h1>Welcome to the Home Page</h1>
          <p>This is the main content of your home page.</p>
        </main>
      </div>
    </div>
  );
};
