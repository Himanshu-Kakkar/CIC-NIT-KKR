import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faSignOutAlt,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { logo } from "../../Data/data";
import "./NavBar.css";

function Navbar() {
  const navigate = useNavigate();

  // Handle logout functionality
  const HandleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/Adminlogin"); // Redirect to login page
  };

  // Check if the user is logged in by looking for the token
  const isLoggedIn = localStorage.getItem("token");

  return (
    <div className="navbar-container">
      <header className="navbar">
        {/* inside navbar header */}
        <div className="logo">
          <a
            href="https://nitkkr.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo[0].image} alt="NIT KKR Logo" />
          </a>
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/clubs">Clubs</a>
            </li>
            <li>
              <a href="/events">Events</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/pastevents">Gallery</a>
            </li>
            <li>
              <a href="/developers">Developer</a>
            </li>
            {/* <li>
              <a href="/admin/dashboard">Dashboard</a>
            </li> */}
          </ul>
        </nav>
        <div className="nav-actions">
          <button className="icon-button">
            <FontAwesomeIcon icon={faBell} />
          </button>

          {!isLoggedIn ? (
            <a href="/Adminlogin" className="admin-login-btn">
              <FontAwesomeIcon icon={faUserShield} />
              <span>Admin</span>
            </a>
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
