import React from 'react';
import './HomePage.css';
import { useNavigate, Link } from 'react-router-dom';
import { clubData } from '../../Data/data';

// Define the clubs to show in header (we'll show only specific clubs)
const headerClubIds = [1, 3, 7, 4, 5, 8, 9, 10]; // IDs of clubs to show in header

const HomePage = () => {
  const navigate = useNavigate();
  
  // Filter clubData to show only selected clubs in header
  const headerClubs = clubData.filter(club => headerClubIds.includes(club.id));

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="klubb-heading">KONNECT</h1>
          <p className="klubb-tagline">NIT Kurukshetra Organisation' Network for Nurturing Events, Clubs and Teams</p>
          {/* <p className="portal-tagline">NIT Kurukshetra's Club Portal</p> */}
          <button className="cta-button" onClick={() => navigate('/clubs')}>
            Discover Clubs
          </button>
        </div>
      </section>

      {/* About Us */}
    {/* About Section with Side-by-Side Layout */}
<section className="about">
  <div className="container">
    <h1 className="section-title">About Us</h1>
    <div className="divider"></div>
    
    <div className="about-stats-container">
      <div className="about-text-container">
        <p className="about-description">
          KONNECT (NIT Kurukshetra Organisation' Network for Nurturing Events, Clubs and Teams) serves as the central hub for all student-led organizations, clubs, and technical teams at NIT Kurukshetra. We facilitate collaboration, innovation, and growth by connecting students with diverse interests and expertise.
        </p>
        <p className="about-description">
          Through our platform, we empower students to discover, join, and contribute to various clubs and teams. From technical clubs to cultural societies, sports teams to entrepreneurship cells, KONNECT brings together the vibrant student community of NIT Kurukshetra under one unified network.
        </p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card blue-stat">
          <div className="stat-number">0+</div>
          <div className="stat-label">Students Connected</div>
        </div>
        <div className="stat-card purple-stat">
          <div className="stat-number">0+</div>
          <div className="stat-label">Events Organized</div>
        </div>
        <div className="stat-card pink-stat">
          <div className="stat-number">0+</div>
          <div className="stat-label">Students Volunteers Engaged</div>
        </div>
        <div className="stat-card cyan-stat">
          <div className="stat-number">0+</div>
          <div className="stat-label">Active Club & Society</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* {OUR Family} */}



    <section className="family-section" id="our-family">
      <div className="container">
        <div className="family-header">
          <div className="family-title">
            <h2>Our Family</h2>
            <div className="divider"></div>
          </div>
          <div className="family-description">
            {/* <p>Explore our diverse collection of clubs and student initiatives.</p> */}
          </div>
          <div className="clubs-title">
            {/* <h3>Clubs</h3> */}
          </div>
        </div>

        <div className="club-logos-grid">
          {headerClubs.map((club) => (
            <Link 
              to={`/clubs/${club.id}`}
              key={club.id} 
              className="club-logo-card"
              // onClick={() => window.scrollTo( {top: 0, behaviopur: 'smooth'})}
            >
              <div className="logo-circle">
                <img src={club.logoUrl} alt={club.name} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  


 
      
    </div>
)};
export default HomePage;