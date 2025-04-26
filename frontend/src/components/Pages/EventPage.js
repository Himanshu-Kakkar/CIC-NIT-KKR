import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import "./EventPage.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/event/all-events")
      .then((res) => {
        setEvents(res.data.events);
      })
      .catch((err) => {
        console.error("Error fetching events", err);
      });
  }, []);

  return (
    <div className="events-container">
      <h2 className="events-heading">Upcoming Events</h2>
      <div className="card-grid">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
