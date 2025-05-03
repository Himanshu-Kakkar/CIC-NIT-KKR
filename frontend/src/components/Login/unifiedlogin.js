import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosInstance from '../../config/axios';
import API_ENDPOINTS from '../../config/api';

import './login.css';

function UnifiedLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [forgotEmail, setForgotEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');

  // Case-insensitive path detection
  const getInitialRole = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/adminlogin')) return 'admin';
    return 'member';
  };

  const [activeTab, setActiveTab] = useState(getInitialRole());

  // Update the URL based on the active tab
  useEffect(() => {
    if (activeTab === 'admin') {
      window.history.pushState({}, '', '/Adminlogin');
    } else {
      window.history.pushState({}, '', '/login');
    }
  }, [activeTab]);

  const handleEmailChange = (e) => setData({ ...data, email: e.target.value });
  const handlePasswordChange = (e) => setData({ ...data, password: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isAdmin 
        ? API_ENDPOINTS.AUTH.ADMIN_LOGIN 
        : API_ENDPOINTS.AUTH.USER_LOGIN;
      
      const response = await axiosInstance.post(endpoint, data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', activeTab);

      if (activeTab === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/admin-home");
      }

      window.alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Login Successful`);
    } catch (error) {
      console.error('Login failed:', error);
      window.alert("Invalid Credentials");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { 
        email: forgotEmail 
      });
      setForgotMessage("Reset link sent! Please check your email.");
    } catch (error) {
      console.error('Password reset request failed:', error);
      setForgotMessage("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input
          id="tab-1"
          type="radio"
          name="tab"
          className="sign-in"
          checked={activeTab === 'member'}
          onChange={() => setActiveTab('member')}
        />
        <label htmlFor="tab-1" className="tab">Member Login</label>

        <input
          id="tab-2"
          type="radio"
          name="tab"
          className="sign-up"
          checked={activeTab === 'admin'}
          onChange={() => setActiveTab('admin')}
        />
        <label htmlFor="tab-2" className="tab">Admin Login</label>

        <div className="login-form">
          <div className={activeTab === 'member' ? 'sign-in-htm active' : 'sign-in-htm'}>
            <div className="group">
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                type="text"
                className="input"
                value={data.email}
                onChange={handleEmailChange}
              />
            </div>
               <div className="group password-group">
                <label htmlFor="password" className="label">Password</label>
                <div className="password-wrapper">
                    <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="input"
                    value={data.password}
                    onChange={handlePasswordChange}
                    />
                    <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                </div>    

            <div className="group">
              <input
                type="submit"
                className="button"
                value={`Sign In as ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
                onClick={handleLogin}
              />
            </div>
            <div className="hr" />
            <div className="foot-lnk">
              <span
                onClick={() => setShowForgotPassword(true)}
                style={{ color: '#aaa', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Forgot Password?
              </span>
            </div>
          </div>
        </div>
      </div>

      {showForgotPassword && (
        <div className="forgot-password-modal">
          <div className="modal-content">
            <h3>Forgot {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="input"
            />
            <button className="button" onClick={handleForgotPassword}>
              Send Reset Link
            </button>
            {forgotMessage && <p style={{ color: 'white' }}>{forgotMessage}</p>}
            <button
              className="button"
              onClick={() => {
                setShowForgotPassword(false);
                setForgotMessage('');
              }}
              style={{ marginTop: '10px', backgroundColor: '#444' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UnifiedLogin;
