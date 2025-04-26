import React, { useState } from 'react';
import axios from 'axios';
import './EventCard.css';

const EventCard = ({ event }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5001/api/event/${event._id}/register`, {
        eventId: event._id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      alert("Registration successful!");
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
    } catch (err) {
      console.error("Registration failed", err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="event-card">
      <div className="image-container">
        <img
          src={event.posterUrl}
          alt={event.title}
          className="poster-img"
          onClick={openModal}
        />
      </div>
      <div className="event-details">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-date">
          <span className="date-label">Ends:</span>{" "}
          {new Date(event.endTime).toLocaleString()}
        </p>

        {new Date(event.endTime) > new Date() ? (
          <form className="register-form" onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleInputChange}
            />
            <button type="submit">Register</button>
          </form>
        ) : (
          <p className="closed-text">Registration Closed</p>
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              ×
            </button>
            <h3 className="modal-title">{event.title}</h3>
            <div className="modal-image-container">
              <img
                src={event.posterUrl}
                alt={event.title}
                className="modal-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard; 