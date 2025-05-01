// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // You can also use just: window.scrollTo(0, 0)
  }, [pathname]);

  return null; // No UI to render
};

export default ScrollToTop;
