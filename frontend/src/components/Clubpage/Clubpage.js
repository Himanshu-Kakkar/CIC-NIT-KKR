import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { clubData } from '../../Data/data';

const Clubpage = () => {
  return (
    <div className="min-h-screen px-6 py-10 text-white font-sans">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4a72cf] to-[#8a65d3] text-transparent bg-clip-text">Clubs</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {clubData.map((club) => (
          <Link
            to={`/clubs/${club.id}`}
            key={club.id}
            className="bg-[#1c2c45] rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col text-white no-underline"
          >
            <div className="h-44 bg-[#0f1828] flex items-center justify-center overflow-hidden">
              <img
                src={club.logoUrl}
                alt={`${club.name} logo`}
                className="w-36 h-36 object-cover rounded-full transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold mb-2">{club.name}</h2>
              <p className="text-[#a0aec0] text-sm leading-relaxed">{club.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Clubpage;
