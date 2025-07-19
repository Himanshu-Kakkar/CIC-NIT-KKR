import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      <div className="text-center p-10 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.2)] max-w-xl w-full">
        
        <div className="text-[64px] font-extrabold text-gray-600 mb-8 animate-[oopsAnimation_2s_infinite] uppercase tracking-wider  inline-block relative">
          Oops!
        </div>

        <div className="flex justify-center items-center mb-8">
          <div className="text-[120px] font-bold text-gray-600 animate-bounce">4</div>
          
          <div className="relative w-[120px] h-[120px] mx-5">
            <div className="absolute w-full h-full border-[15px] border-gray-600 rounded-full animate-[rotate_4s_linear_infinite]" />
          </div>

          <div className="text-[120px] font-bold text-gray-600 animate-bounce">4</div>
        </div>

        <h1 className="text-[36px] text-gray-600 mb-5 animate-fadeIn">Page Not Found</h1>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-400 to-purple-500 shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
