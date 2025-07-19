import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUserShield,
  faTachometerAlt,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, NavLink } from 'react-router-dom';
import { logo } from '../../Data/data';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate("/login");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const isLoggedIn = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1400px] bg-[#192235] rounded-xl shadow-lg z-50">
      <header className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="https://nitkkr.ac.in" target="_blank" rel="noopener noreferrer">
            <img src={logo[0].image} alt="NIT KKR Logo" className="h-12 w-auto rounded-md" />
          </a>
        </div>

        {/* Desktop Nav */}
        <nav
          ref={menuRef}
          className={`fixed top-0 right-0 h-screen w-72 bg-[#192235] z-40 transform transition-transform duration-300 ease-in-out md:static md:h-auto md:w-auto md:bg-transparent md:flex md:items-center md:justify-center md:transform-none ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 p-6 md:p-0">
            {['/', '/clubs', '/events', '/pastevents', '/contact'].map((path, index) => {
              const labels = ['Home', 'Clubs', 'Events', 'Gallery', 'Contact'];
              return (
                <li key={path}>
                  <NavLink
  to={path}
  className={({ isActive }) =>
    `text-white px-4 py-2 rounded-md font-medium transition duration-200 ${
      isActive
        ?  'underline decoration-clone decoration-white-500 shadow-md'
        : 'hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500'
    }`
  }
  onClick={() => setIsMenuOpen(false)}
>
  {labels[index]}
</NavLink>

                </li>
              );
            })}

            {/* Mobile Auth Buttons */}
            <li className="md:hidden border-t border-white/10 pt-4">
              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/admin/dashboard"
                    className="flex items-center gap-2 text-white py-2 hover:text-blue-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={faTachometerAlt} />
                    Dashboard
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-white py-2 hover:text-red-400"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Logout
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="flex items-center gap-2 text-white py-2 hover:text-green-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faUserShield} />
                  Login
                </a>
              )}
            </li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <NavLink
                to="/admin/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-gray-700 hover:from-blue-600 hover:to-purple-600 transition"
              >
                <FontAwesomeIcon icon={faTachometerAlt} />
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </button>
            </>
          ) : (
            role !== 'admin' && (
              <a
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-purple-600 transition"
              >
                <FontAwesomeIcon icon={faUserShield} />
                Login
              </a>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="md:hidden text-white text-xl ml-4 z-50"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </header>
    </div>
  );
}

export default Navbar;
