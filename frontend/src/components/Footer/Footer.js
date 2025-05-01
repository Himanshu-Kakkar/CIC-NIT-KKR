import React from 'react';
import './Footer.css';
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Background decorative elements */}
      <div className="footer-bg-elements">
        <div className="footer-circle footer-circle-1"></div>
        <div className="footer-circle footer-circle-2"></div>
        <div className="footer-glow"></div>
        
      </div>
      
      <div className="container">
        <div className="footer-content">
          <nav className="footer-nav">
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/clubs">Clubs</a></li>
              <li><a href="/pastevents">Gallery</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/developers">Developers</a></li>
            </ul>
          </nav>
          
          {/* Social icons */}
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Twitter">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="social-icon" aria-label="Facebook">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <FaLinkedin size={18} />
            </a>
          </div>
          
          <p className="copyright">© 2025 Clubs Management Portal | Developed by NRHK❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;