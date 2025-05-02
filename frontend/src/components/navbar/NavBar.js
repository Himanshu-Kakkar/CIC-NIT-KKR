import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserShield, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, NavLink } from 'react-router-dom';
import { logo } from '../../Data/data';
import './NavBar.css';

function Navbar() {
  const navigate = useNavigate();

  // Handle logout functionality
  const HandleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('role');  // Also clear role
    navigate("/login"); // Redirect to login page
  };

  const isLoggedIn = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <div className="navbar-container">
      <header className="navbar">
        <div className="logo">
          <a href="https://nitkkr.ac.in" target="_blank" rel="noopener noreferrer">
            <img src={logo[0].image} alt="NIT KKR Logo" />
          </a>
        </div>

        <nav className="nav-links">
          <ul>
            <li>
              <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/clubs" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                Clubs
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/pastevents" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                Contact
              </NavLink>
            </li>
            
          </ul>
        </nav>

        {isLoggedIn && (
          <NavLink to="/admin/dashboard" className="admin-dashboard-btn">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span style={{ marginLeft: "5px" }}>Dashboard</span>
          </NavLink>
        )}

        <div className="nav-actions">
          {!isLoggedIn ? (
            !role || role === "member" ? (
              <a href="/login" className="admin-login-btn">
                <FontAwesomeIcon icon={faUserShield} />
                <span>Login</span>
              </a>
            ) : null
          ) : (
            <button className="logout-btn" onClick={HandleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
