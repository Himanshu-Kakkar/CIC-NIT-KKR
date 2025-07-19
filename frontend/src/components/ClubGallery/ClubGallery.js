import React, { useState } from 'react';

const ClubGallery = ({ currentClubId, clubs }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const currentClub = clubs.find(club => club.id === currentClubId);
  
  if (!currentClub) return null;

  const clubImages = [
    currentClub.img1, currentClub.img2, currentClub.img3,
    currentClub.img4, currentClub.img5, currentClub.img6
  ].filter(Boolean);

  const totalSlides = Math.ceil(clubImages.length / 3);

  const handlePrevSlide = () => {
    setActiveSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-10 ">
      <div className="max-w-[1200px] mx-auto px-5">
        <h3 className="text-center text-transparent bg-gradient-to-r from-[#4a72cf] to-[#8a65d3] bg-clip-text text-[2.2rem] mb-6 font-semibold">
          Gallery
        </h3>

        <div className="relative overflow-hidden px-[30px] -mx-[30px]">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className={`min-w-full transition-opacity duration-500 ease-in-out px-[30px] ${slideIndex === activeSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="grid grid-cols-3 gap-5 p-2.5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 max-[900px]:gap-4 max-[600px]:gap-2.5">
                  {clubImages.slice(slideIndex * 3, slideIndex * 3 + 3).map((img, index) => (
                    <div
                      key={index}
                      className="rounded-[12px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.25)] bg-[#1c2c45] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer aspect-[4/3] relative hover:translate-y-[-10px] hover:scale-[1.04] hover:rotate-[-1deg] hover:shadow-[0_16px_40px_rgba(74,114,207,0.25)]"
                    >
                      <div className="w-full h-full relative bg-[#101a33] overflow-hidden">
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.12] hover:rotate-[2deg]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {totalSlides > 1 && (
            <>
              <button
                onClick={handlePrevSlide}
                className="absolute top-1/2 left-[5px] transform -translate-y-1/2 bg-[rgba(30,45,80,0.85)] border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-[#4a72cf] text-[1.5rem] z-20 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-gradient-to-r hover:from-[#4a72cf] hover:to-[#8a65d3] hover:text-white hover:scale-110"
              >
                &lt;
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute top-1/2 right-[5px] transform -translate-y-1/2 bg-[rgba(30,45,80,0.85)] border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-[#4a72cf] text-[1.5rem] z-20 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-gradient-to-r hover:from-[#4a72cf] hover:to-[#8a65d3] hover:text-white hover:scale-110"
              >
                &gt;
              </button>
            </>
          )}
        </div>

        {/* Optional indicators — Hidden by default */}
        <div className="hidden mt-4 justify-center">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full mx-1 ${index === activeSlide ? 'bg-[#4a72cf]' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubGallery;
