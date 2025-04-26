import React, { useState, useEffect } from 'react';
import './newPassword.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function NewPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const { resetToken } = useParams();

  useEffect(() => {
    // Get token from URL parameter
    if (resetToken) {
      setToken(resetToken);
    } else {
      // If no token in URL, try to get from query string
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromQuery = urlParams.get('token');
      if (tokenFromQuery) {
        setToken(tokenFromQuery);
      } else {
        // If no token found, redirect to login
        navigate('/login');
      }
    }
  }, [resetToken, navigate]);

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!newPassword) {
      errors.newPassword = 'Please enter a new password';
    } else if (newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      
      // In a real application, you would make an API call here
      // For example:
      // axios.post('/api/reset-password', { 
      //   token, 
      //   newPassword 
      // })
      
      // Simulating API call
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3001);
      }, 1500);
    }
  };

  if (isSubmitted) {
    return (
      <div className="new-password-wrap">
        <div className="new-password-html">
          <div className="new-password-form">
            <div className="success-message">
              <h2 className="new-password-title">Password Reset Successful</h2>
              <p>Your password has been reset successfully.</p>
              <p>You will be redirected to the login page in a few seconds.</p>
              <div className="foot-lnk">
                <a href="#" onClick={() => navigate('/login')}>Go to Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="new-password-wrap">
      <div className="new-password-html">
        <div className="new-password-form">
          <h2 className="new-password-title">Reset Password</h2>
          <p className="new-password-description">
            Please enter your new password below.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="group">
              <label htmlFor="newPassword" className="label">New Password</label>
              <div className="password-input-container">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  className="input"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  placeholder="Enter your new password"
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={toggleNewPasswordVisibility}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formErrors.newPassword && <span className="error-message">{formErrors.newPassword}</span>}
            </div>
            
            <div className="group">
              <label htmlFor="confirmPassword" className="label">Confirm Password</label>
              <div className="password-input-container">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="input"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm your new password"
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
            </div>
            
            <div className="group">
              <input 
                type="submit" 
                className="button" 
                value={isLoading ? "Resetting..." : "Reset Password"} 
                disabled={isLoading}
              />
            </div>

            <div className="hr" />
            <div className="foot-lnk">
              <a href="#" onClick={() => navigate('/login')}>Back to Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
