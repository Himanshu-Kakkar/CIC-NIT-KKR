import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { clubData } from "../../Data/data";
import ClubGallery from "../ClubGallery/ClubGallery";
import ClubForm from "../ClubForm/ClubForm";

export default function ClubDetailPage() {
  const { clubId } = useParams();
  const club = clubData.find(c => c.id === parseInt(clubId));
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!club) {
    return (
      <div className="p-20 bg-[#1c2c45] rounded-lg max-w-xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Club not found</h2>
        <Link
          to="/clubs"
          className="inline-block bg-gradient-to-r from-[#4a72cf] to-[#8a65d3] text-white py-3 px-6 rounded-full font-medium hover:translate-y-[-3px] hover:shadow-lg transition"
        >
          Back to Clubs
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen  py-12 px-4 sm:px-8 lg:px-12 overflow-x-hidden">
      {/* Decorative overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">

      </div>

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto bg-[#121f36]/40 border border-[#4a72cf]/20 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-28 h-28 min-w-[112px] rounded-full overflow-hidden border-4 border-[#4a72cf] shadow-md transform hover:scale-105 transition">
            <img src={club.logoUrl} alt={`${club.name} logo`} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#4a72cf] to-[#8a65d3] bg-clip-text tracking-wide">
              {club.name}
            </h2>
            <p className="mt-2 italic text-[#cbd5e0] text-lg">{club.description}</p>
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="relative z-10 mt-12 grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
        <div className="bg-[#1c2c45]/60 backdrop-blur-lg p-6 rounded-2xl shadow-md border border-[#4a72cf]/10">
          <h3 className="text-2xl font-semibold text-white mb-4 border-b pb-2 border-[#4a72cf]/20">About Us</h3>
          <p className="text-[#a0aec0] text-base leading-relaxed">{club.fullDescription}</p>
        </div>

        <div className="bg-[#1c2c45]/60 backdrop-blur-lg p-6 rounded-2xl shadow-md border border-[#4a72cf]/10">
          <h3 className="text-2xl font-semibold text-white mb-4 border-b pb-2 border-[#4a72cf]/20">Events Conducted</h3>
          <ul className="space-y-4 text-[#a0aec0] list-inside list-disc">
            {club.events.map((e, i) => (
              <li key={i} className="hover:text-white transition">{e}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Gallery */}
      <div className="relative z-10 mt-16 max-w-6xl mx-auto">
        
        <ClubGallery currentClubId={parseInt(clubId)} clubs={clubData} />
      </div>

      {/* Actions */}
      <div className="relative z-10 mt-12 flex flex-col sm:flex-row justify-center gap-6 max-w-6xl mx-auto">
        <Link
          to="/clubs"
          className="bg-gradient-to-r from-[#4a72cf] to-[#8a65d3] text-white px-6 py-3 rounded-full font-medium shadow-md hover:translate-y-[-2px] transition"
        >
          Back to Clubs
        </Link>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-[#8a65d3] to-[#4a72cf] text-white px-6 py-3 rounded-full font-medium shadow-md hover:translate-y-[-2px] transition"
        >
          Contact Us
        </button>
      </div>

      {/* Contact Form Popup */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-11/12 max-h-[90vh] overflow-auto shadow-xl relative animate-slideUp">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-black transition"
            >
              ×
            </button>
            <ClubForm onClose={() => setShowForm(false)} clubName={club.name} />
          </div>
        </div>
      )}
    </div>
  );
}
