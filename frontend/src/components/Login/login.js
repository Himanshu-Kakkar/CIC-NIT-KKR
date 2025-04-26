import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmpassword(event.target.value);
  const handleRollNoChange = (event) => setRollNo(event.target.value);

  const handleSignIn = (event) => {
    event.preventDefault();

    const data = { email, password };
    axios.post('http://localhost:5001/api/auth/userlogin', data)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        navigate("/admin-home");
        window.alert("Login Successfully");
      })
      .catch(error => {
        console.error('Error during login:', error);
        window.alert("Invalid Credentials");
      });
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    const dataForRegister = { name, rollNo, password, confirmpassword, email };
    axios.post('http://localhost:5001/api/auth/userregister', dataForRegister)
      .then((response) => {
        console.log(response.data);
        window.alert('Registration successful');
        setShowSignInForm(true);
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        window.alert('Registration failed');
      });
  };

  const handleTabChange = (event) => {
    setShowSignInForm(event.target.id === 'tab-1');
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      return window.alert("Please enter your email");
    }

    try {
      const res = await axios.post('http://localhost:5001/api/auth/forgotPassword', {
        email: forgotEmail
      });

      setForgotMessage("Reset link sent! Please check your email.");
    } catch (err) {
      console.error(err);
      setForgotMessage("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" checked={showSignInForm} onChange={handleTabChange} />
        <label htmlFor="tab-1" className="tab">Sign In</label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" checked={!showSignInForm} onChange={handleTabChange} />
        <label htmlFor="tab-2" className="tab">Sign Up</label>
        <div className="login-form">
          {showSignInForm ? (
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="email" className="email">Email</label>
                <input id="email" type="text" className="input" value={email} onChange={handleEmailChange} />
              </div>
              <div className="group">
                <label htmlFor="password" className="password">Password</label>
                <input id="password" type="password" className="input" data-type="password" value={password} onChange={handlePasswordChange} />
              </div>
              <div className="group">
                <input type="submit" className="button" value="Sign In" onClick={handleSignIn} />
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
          ) : (
            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="user" className="label">Name</label>
                <input id="user" type="text" className="input" value={name} onChange={handleNameChange} />
              </div>
              <div className="group">
                <label htmlFor="email" className="label">Email</label>
                <input id="email" type="text" className="input" value={email} onChange={handleEmailChange} />
              </div>
              <div className="group">
                <label htmlFor="rollno" className="label">Roll Number</label>
                <input id="rollno" type="text" className="input" value={rollNo} onChange={handleRollNoChange} />
              </div>
              <div className="group">
                <label htmlFor="password" className="label">Password</label>
                <input id="password" type="password" className="input" data-type="password" value={password} onChange={handlePasswordChange} />
              </div>
              <div className="group">
                <label htmlFor="confirmpassword" className="label">Confirm Password</label>
                <input id="confirmpassword" type="password" className="input" value={confirmpassword} onChange={handleConfirmPasswordChange} />
              </div>
              <div className="group">
                <input type="submit" className="button" value="Sign Up" onClick={handleSignUp} />
              </div>
              <div className="hr" />
              <div className="foot-lnk">
                <label htmlFor="tab-1">Already Member?</label>
              </div>
            </div>
          )}
        </div>
      </div>

      {showForgotPassword && (
        <div className="forgot-password-modal">
          <div className="modal-content">
            <h3>Forgot Password</h3>
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

export default Login;
