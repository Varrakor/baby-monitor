import React from 'react';
import { auth, googleProvider } from '../config/firebase'; // Import auth and googleProvider
import { signInWithPopup, signOut } from 'firebase/auth'; // Import signInWithPopup and signOut

import { useNavigate } from 'react-router-dom';

export const Auth = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect to /home after successful login
      console.log("navigating to home")
      navigate('/home');
    } catch (err) {
      console.log("Login failed")
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Use signOut from 'firebase/auth'
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};
