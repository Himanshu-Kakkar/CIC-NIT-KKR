import React, { useState } from 'react';
import './login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const errors = {};
    if (!name) {
      errors.name = 'Please enter your name';
    }
    if (!email) {
      errors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!password) {
      errors.password = 'Please enter a password';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!rollNumber) {
      errors.rollNumber = 'Please enter your roll number';
    } else if (!/^\d{9}$/.test(rollNumber)) {
      errors.rollNumber = 'Roll number must be 9 digits';
    }
    return errors;
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const data = {
        name,
        email,
        rollNumber,
        password,
        confirmPassword
      };

      axios.post('http://localhost:5001/register', data)
        .then((response) => {
          console.log(response.data);
          window.alert('Registration successful');
          navigate('/login');
        })
        .catch((error) => {
          console.error(error);
          window.alert('Registration failed');
        });
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <div className="login-form">
          <h2 className="label">Sign Up</h2>

            <div className="group">
            <label htmlFor="name" className="label">Full Name</label>
              <input 
                id="name" 
                type="text" 
                className="input" 
                value={name} 
                onChange={handleNameChange}
                placeholder="Enter your full name"
              />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>
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
            <label htmlFor="rollNumber" className="label">Roll Number</label>
              <input 
                id="rollNumber" 
                type="text" 
                className="input" 
                value={rollNumber} 
                onChange={handleRollNumberChange}
                placeholder="Enter your 9-digit roll number"
                maxLength="9"
              />
              {formErrors.rollNumber && <span className="error-message">{formErrors.rollNumber}</span>}
            </div>
          <div className="group">
            <label htmlFor="password" className="label">Password</label>
            <div className="input">
                <input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  value={password} 
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                />
                <button 
                  type="button" 
                  onClick={togglePasswordVisibility}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formErrors.password && <span className="error-message">{formErrors.password}</span>}
            </div>
          <div className="group">
            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
            <div className="input">
                <input 
                  id="confirmPassword" 
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword} 
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm your password"
                />
                <button 
                  type="button" 
                  onClick={toggleConfirmPasswordVisibility}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
            </div>
            <div className="group">
              <input type="submit" className="button" value="Sign Up" onClick={handleSignUp} />
            </div>
            <div className="hr" />
            <div className="foot-lnk">
              <a href="/login">Already have an account? Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
