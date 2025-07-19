import React from 'react';
// import './Footer.css';
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#121f36] pt-10 pb-8 mt-auto overflow-hidden">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute rounded-full bg-gradient-to-br from-[#3b5bdb22] to-[#4c6ef522] w-[200px] h-[200px] -top-[100px] left-[10%]" />
        <div className="absolute rounded-full bg-gradient-to-br from-[#3b5bdb22] to-[#4c6ef522] w-[150px] h-[150px] -bottom-[50px] right-[15%]" />
        <div className="absolute w-[300px] h-[300px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{background: 'radial-gradient(circle, rgba(138, 180, 248, 0.1) 0%, rgba(10, 19, 40, 0) 70%)'}} />
        {/* Decorative dots patterns */}
        <svg className="absolute opacity-20 left-[5%] top-[30%] hidden sm:block" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          {[0, 1, 2].map(row => (
            [0, 1, 2].map(col => (
              <circle 
                key={`${row}-${col}`} 
                cx={10 + col * 20} 
                cy={10 + row * 20} 
                r="2" 
                fill="#8ab4f8" 
              />
            ))
          ))}
        </svg>
        <svg className="absolute opacity-20 right-[5%] bottom-[30%] hidden sm:block" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          {[0, 1, 2].map(row => (
            [0, 1, 2].map(col => (
              <circle 
                key={`${row}-${col}`} 
                cx={10 + col * 20} 
                cy={10 + row * 20} 
                r="2" 
                fill="#8ab4f8" 
              />
            ))
          ))}
        </svg>
      </div>
      <div className="relative z-20 max-w-[1200px] mx-auto px-5">
        <div className="flex flex-col items-center justify-center w-full">
          <nav className="w-full">
            <ul className="flex flex-wrap justify-center gap-12 mb-10 w-full list-none p-0 m-0 text-base font-medium text-[#a0aec0] [&>li>a]:transition-colors [&>li>a]:duration-300 [&>li>a]:relative [&>li>a]:pb-1 [&>li>a]:after:content-[''] [&>li>a]:after:absolute [&>li>a]:after:w-0 [&>li>a]:after:h-0.5 [&>li>a]:after:left-1/2 [&>li>a]:after:bottom-0 [&>li>a]:after:bg-[#8ab4f8] [&>li>a]:after:transition-all [&>li>a]:after:duration-300 [&>li>a]:after:transform [&>li>a]:after:-translate-x-1/2 hover:[&>li>a]:text-[#8ab4f8] hover:[&>li>a]:after:w-full max-sm:gap-8 max-[480px]:flex-col max-[480px]:gap-4 max-[480px]:items-center">
              <li><a href="/">Home</a></li>
              <li><a href="/clubs">Clubs</a></li>
              <li><a href="/pastevents">Gallery</a></li>
              <li><a href="/contact">Contact</a></li>
              {/* <li><a href="/developers">Developers</a></li> */}
            </ul>
          </nav>
          {/* Social icons */}
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-[#a0aec0] transition-all duration-300 hover:bg-[#8ab4f833] hover:text-[#8ab4f8] hover:-translate-y-1" aria-label="Twitter">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-[#a0aec0] transition-all duration-300 hover:bg-[#8ab4f833] hover:text-[#8ab4f8] hover:-translate-y-1" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-[#a0aec0] transition-all duration-300 hover:bg-[#8ab4f833] hover:text-[#8ab4f8] hover:-translate-y-1" aria-label="Facebook">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-[#a0aec0] transition-all duration-300 hover:bg-[#8ab4f833] hover:text-[#8ab4f8] hover:-translate-y-1" aria-label="LinkedIn">
              <FaLinkedin size={18} />
            </a>
          </div>
          <p className="text-[#64748b] text-sm text-center w-full mt-8">© 2025 Clubs Management Portal | CIC </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;