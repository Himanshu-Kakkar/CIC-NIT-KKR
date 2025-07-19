import React from 'react';
// import './HomePage.css';
import { useNavigate, Link } from 'react-router-dom';
import { clubData } from '../../Data/data';

// Define the clubs to show in header (we'll show only specific clubs)
const headerClubIds = [1, 3, 7, 4, 5, 8, 9, 10]; // IDs of clubs to show in header

const HomePage = () => {
  const navigate = useNavigate();
  
  // Filter clubData to show only selected clubs in header
  const headerClubs = clubData.filter(club => headerClubIds.includes(club.id));

  return (
    <div className="font-poppins text-slate-200 leading-relaxed">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-5 text-center bg-gradient-to-br from-[#121f36] via-[#1c2c45] to-[#121f36] relative overflow-hidden">
        <div className="absolute inset-0 z-0" style={{background: 'radial-gradient(circle at center, rgba(28,44,69,0.3) 0%, rgba(18,31,54,0.6) 50%, rgba(18,31,54,0.9) 100%)'}}></div>
        <div className="relative z-10 max-w-2xl flex flex-col items-center justify-start mt-[-100px] pt-8">
          <p className="text-2xl text-cyan-300 mb-4 font-light tracking-wide">Explore • Engage • Excel</p>
          <h1 className="text-[9rem] sm:text-[6rem] font-extrabold uppercase tracking-[4px] leading-[1.1] bg-gradient-to-b from-[#d6e4ff] to-[#94b8ff] bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] mb-4">CAMPUS<br/> INNOVATION <br/>COUNCIL</h1>
          <p className="text-xl sm:text-2xl text-[#94b8ff] mb-12 font-normal tracking-wide opacity-90">NIT Kurukshetra's Club Portal</p>
          <button className="mt-8 px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0a0f24] rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl" onClick={() => navigate('/clubs')}>
            Discover Clubs
          </button>
        </div>
      </section>

      {/* About Us */}
      <section className="py-24 px-5 flex justify-center items-center w-full bg-transparent">
        <div className="max-w-[1200px] w-full flex flex-col items-center mx-auto p-0">
          <h2 className="text-4xl text-blue-300 font-bold mb-4 text-center">About Us</h2>
          <div className="h-[3px] w-16 bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 rounded mx-auto"></div>
          <div className="flex flex-row gap-10 mt-10 items-start w-full justify-center px-5 max-lg:flex-col max-lg:items-center">
            <div className="flex-1 text-left max-w-[45%] px-2 max-lg:max-w-full max-lg:text-center">
              <p className="text-slate-200 text-base sm:text-lg mb-5 leading-7">Welcome to our Club Management platform! We are here to provide clubs with a streamlined, user-friendly solution to manage their members, events, and activities. Our platform allows easy event registrations, member management, and event updates, all in one place. Whether you're managing a sports club, a cultural society, or any other community group, we make it simple to stay organized and connected.</p>
              <p className="text-slate-200 text-base sm:text-lg mb-5 leading-7">We focus on making club management more efficient, reducing the administrative workload, and giving members a seamless experience. Join us and take your club to the next level with smart management tools that keep your community engaged and active!.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-[45%] px-2 max-lg:w-full">
              <div className="bg-[#121c3d80] rounded-xl p-4 flex flex-col items-center border border-white/10 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold mb-2 text-cyan-300">110+</div>
                <div className="text-slate-400 text-sm font-medium text-center">Students Connected</div>
              </div>
              <div className="bg-[#121c3d80] rounded-xl p-4 flex flex-col items-center border border-white/10 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold mb-2 text-purple-300">35+</div>
                <div className="text-slate-400 text-sm font-medium text-center">Events Organised</div>
              </div>
              <div className="bg-[#121c3d80] rounded-xl p-4 flex flex-col items-center border border-white/10 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold mb-2 text-pink-400">70+</div>
                <div className="text-slate-400 text-sm font-medium text-center">Students Volunteers Engaged</div>
              </div>
              <div className="bg-[#121c3d80] rounded-xl p-4 flex flex-col items-center border border-white/10 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold mb-2 text-cyan-400">11+</div>
                <div className="text-slate-400 text-sm font-medium text-center">Active Clubs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Family */}
      <section className="py-20 px-5 text-slate-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center mb-10 w-full">
            <div className="flex flex-col items-center">
              <h2 className="text-5xl text-indigo-200 font-semibold m-0">Our Family</h2>
              <div className="h-[3px] w-16 bg-gradient-to-r from-cyan-400 to-blue-500 my-6 rounded mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-8 p-5 w-full max-w-[1200px] mx-auto max-lg:grid-cols-2 max-[480px]:grid-cols-1">
            {headerClubs.map((club) => (
              <Link 
                to={`/clubs/${club.id}`} 
                key={club.id} 
                className="aspect-square w-full flex flex-col items-center justify-center group transition-transform duration-300 hover:-translate-y-2"
                onClick={() => window.scrollTo(0, 0)} // Scroll to top when clicking
              >
                <div className="">
                  <img src={club.logoUrl} alt={club.name} className="w-25 h-25 rounded-2xl object-contain" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
)};
export default HomePage;




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { clubData } from '../../Data/data';

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-[#0a0f24] text-white min-h-screen pt-20 px-4">
//       {/* Hero Section */}
//       <section className="text-center">
//         <h1 className=>
//           CAMPUS<br />INNOVATION<br />COUNCIL
//         </h1>
//         <p className="text-xl sm:text-2xl text-[#94b8ff] font-medium mb-2 tracking-wide">
//           Your Gateway to Innovation & Collaboration
//         </p>
//         <p className="text-md sm:text-lg text-gray-400 font-light mb-6">
//           A central hub for all clubs & societies at NIT Kurukshetra
//         </p>
//         <button
//           onClick={() => navigate('/clubs')}
//           className="mt-8 px-8 py-3 bg-gradient-to-r from-cyan-400 to-[#4895ef] text-[#0a0f24] rounded-lg text-lg font-semibold shadow-[0_4px_12px_rgba(79,195,247,0.3)] hover:shadow-[0_8px_20px_rgba(79,195,247,0.4)] transition-all duration-300 hover:-translate-y-1"
//         >
//           Discover Clubs
//         </button>
//       </section>

//       {/* About Section */}
//       <section className="mt-24 flex flex-col md:flex-row items-center justify-between gap-10 px-2">
//         <div className="flex-1 text-left max-w-[45%] px-[10px]">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#d6e4ff]">
//             About the Portal
//           </h2>
//           <p className="text-base sm:text-lg text-gray-300">
//             The CIC Club Portal is your one-stop platform to explore the vibrant club culture at NIT Kurukshetra.
//             Discover upcoming events, join communities, and collaborate on exciting projects.
//           </p>
//         </div>
//         <div className="grid grid-cols-2 gap-[15px] w-[45%] px-[10px]">
//           {clubData.map((club, index) => (
//             <Link
//               to={`/club/${club.id}`}
//               key={index}
//               className="aspect-square max-w-[220px] w-full bg-[#1e293b] p-4 rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-md"
//             >
//               <img
//                 src={club.logoUrl}
//                 alt={club.name}
//                 className="object-contain h-full w-full"
//               />
//             </Link>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;
