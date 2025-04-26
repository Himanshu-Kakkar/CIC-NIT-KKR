import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email';
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Simulate API call for password reset
      // In a real application, you would make an API call here
      setTimeout(() => {
        setIsSubmitted(true);
      }, 1000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="login-wrap">
        <div className="login-html">
          <div className="login-form">
            <div className="group">
              <h2 className="label">Check Your Email</h2>
              <p className="label">We've sent password reset link to your email address.</p>
              <p className="label">Please check your inbox and follow the link to reset your password.</p>
              <div className="foot-lnk">
                <a href="#" onClick={() => navigate('/login')}>Back to Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-wrap">
      <div className="login-html">
        <div className="login-form">
          <h2 className="label">Forgot Password</h2>
          <p className="label">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="group">
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                type="email"
                className="input"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>
            
            <div className="group">
              <input 
                type="submit" 
                className="button" 
                value="Reset Password" 
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

export default ForgotPassword;
