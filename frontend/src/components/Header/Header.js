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
          <p className="hero-tagline">Explore • Engage • Excel</p>
          <h1 className="klubb-heading">INSTITUE <br/> INNOVATION <br/>COUNCIL</h1>
          <p className="portal-tagline">NIT Kurukshetra's Club Portal</p>
          <button className="cta-button" onClick={() => navigate('/clubs')}>
            Discover Clubs
          </button>
        </div>
      </section>

      {/* About Us */}
    {/* About Section with Side-by-Side Layout */}
<section className="about">
  <div className="container">
    <h2 className="section-title">About Us</h2>
    <div className="divider"></div>
    
    <div className="about-stats-container">
      <div className="about-text-container">
        <p className="about-description">
          The Institute Innovation Council (IIC) is at the forefront of nurturing student innovation, technical skills, and leadership. We provide students with the resources and guidance needed to bring their ideas to life through a wide range of technical clubs, teams, and events.
        </p>
        <p className="about-description">
          With a focus on fostering collaboration and creativity, IIC plays a pivotal role in organizing technical workshops, competitions, and projects. From robotics to artificial intelligence, the council caters to a diverse set of technical interests, making it a hub for student-led innovation.
        </p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card blue-stat">
          <div className="stat-number">20+</div>
          <div className="stat-label">Tech Bodies</div>
        </div>
        <div className="stat-card purple-stat">
          <div className="stat-number">80+</div>
          <div className="stat-label">Yearly Events</div>
        </div>
        <div className="stat-card pink-stat">
          <div className="stat-number">200+</div>
          <div className="stat-label">Summer Projects</div>
        </div>
        <div className="stat-card cyan-stat">
          <div className="stat-number">10k+</div>
          <div className="stat-label">Students Catered</div>
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
              onClick={() => window.scrollTo(0, 0)} // Scroll to top when clicking
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