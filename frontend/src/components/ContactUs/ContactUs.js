import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { facultyMembers, conveners } from '../../Data/data';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const [currentFacultyIndex, setCurrentFacultyIndex] = useState(0);
  const [currentConvenerIndex, setCurrentConvenerIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const cardsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Check login
  const token = localStorage.getItem('token');
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1530] text-gray-100">
        <button
          className="px-6 py-2 bg-blue-900 text-white rounded shadow hover:bg-blue-700 transition"
          onClick={() => navigate('/login')}
        >
          Go to Login
        </button>
      </div>
    );
  }


  const nextFaculty = () => {
    setCurrentFacultyIndex((prev) => (prev + cardsPerPage) % facultyMembers.length);
  };

  const prevFaculty = () => {
    setCurrentFacultyIndex((prev) => (prev - cardsPerPage + facultyMembers.length) % facultyMembers.length);
  };

  const nextConvener = () => {
    setCurrentConvenerIndex((prev) => (prev + cardsPerPage) % conveners.length);
  };

  const prevConvener = () => {
    setCurrentConvenerIndex((prev) => (prev - cardsPerPage + conveners.length) % conveners.length);
  };

  const visibleFaculty = isMobile
    ? facultyMembers
    : facultyMembers.slice(currentFacultyIndex, currentFacultyIndex + cardsPerPage);

  const visibleConveners = isMobile
    ? conveners
    : conveners.slice(currentConvenerIndex, currentConvenerIndex + cardsPerPage);

  return (
    <div className="min-h-screen bg-[#0d1530] text-gray-100 px-4 py-8">
      <main className="max-w-screen-xl mx-auto space-y-24">
        {/* Faculty Section */}
        <section className="space-y-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4a72cf] to-[#8a65d3] text-center">
            Faculty Incharge of Council
          </h2>

          <div className="relative w-full flex items-center justify-center">
            {!isMobile && (
              <button
                onClick={prevFaculty}
                className="absolute left-0 z-10 bg-[#4a72cf]/80 hover:bg-[#4a72cf] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition"
              >
                <FaChevronLeft />
              </button>
            )}

            <div
              className={`w-full ${
                isMobile ? 'grid grid-cols-1 max-w-sm mx-auto overflow-x-auto' : 'grid grid-cols-4 gap-8'
              }`}
            >
              {visibleFaculty.map((member, idx) => (
                <Card key={idx} member={member} type="faculty" />
              ))}
            </div>

            {!isMobile && (
              <button
                onClick={nextFaculty}
                className="absolute right-0 z-10 bg-[#4a72cf]/80 hover:bg-[#4a72cf] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition"
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </section>

        {/* Conveners Section */}
        <section className="space-y-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4a72cf] to-[#8a65d3] text-center">
            Conveners
          </h2>

          <div className="relative w-full flex items-center justify-center">
            {!isMobile && (
              <button
                onClick={prevConvener}
                className="absolute left-0 z-10 bg-[#4a72cf]/80 hover:bg-[#4a72cf] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition"
              >
                <FaChevronLeft />
              </button>
            )}

            <div
              className={`w-full ${
                isMobile ? 'grid grid-cols-1 max-w-sm mx-auto overflow-x-auto' : 'grid grid-cols-4 gap-8'
              }`}
            >
              {visibleConveners.map((member, idx) => (
                <Card key={idx} member={member} type="convener" />
              ))}
            </div>

            {!isMobile && (
              <button
                onClick={nextConvener}
                className="absolute right-0 z-10 bg-[#4a72cf]/80 hover:bg-[#4a72cf] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition"
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </section>

        {/* Map Section */}
        <section className="text-center space-y-6 mt-12">
          <h2 className="text-3xl font-semibold text-[#8ab4f8]">Where to find us?</h2>
          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6914.337500690782!2d76.8114186926715!3d29.945824349893147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e3f51bab18cb5%3A0x96200205143e35f6!2sNIT%2C%20Thanesar%2C%20Haryana%20136119!5e0!3m2!1sen!2sin!4v1745345632860!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NIT Kurukshetra Location"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;
