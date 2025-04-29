import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faSignOutAlt,
  faUserShield,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { logo } from "../../Data/data";
import "./NavBar.css";

function Navbar() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // You might want to verify the token and check admin status from your backend
      // For now, we'll just check if the token exists
      setIsAdmin(true);
    }
  }, []);

  // Handle logout functionality
  const HandleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsAdmin(false); // Reset admin status
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
            {isAdmin && (
              <li>
                <a href="/admin/dashboard">

                  <span>Dashboard</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
        <div className="nav-actions">


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
