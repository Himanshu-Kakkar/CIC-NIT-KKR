import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Get token from localStorage

  if (!token) {
    // If no token, navigate to the login page
    return <Navigate to="/Adminlogin" />;
  }

  return children; // If token exists, render the protected component
};

export default PrivateRoute;
