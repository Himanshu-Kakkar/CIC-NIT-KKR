import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [endTime, setEndTime] = useState("");
  const [poster, setPoster] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const [events, setEvents] = useState([]);

  // 🔁 Fetch all events on page load
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/event/all-events");
      setEvents(res.data.events);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const handlePosterSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPoster(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleAddEvent = async () => {
    if (!title || !endTime || !poster) {
      setNotification({
        show: true,
        message: "Please fill all fields and select a poster image",
        type: "error"
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3001);
      return;
    }

    setIsLoading(true);
    
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("endTime", endTime);
      formData.append("poster", poster);

      const response = await axios.post(
        "http://localhost:5001/api/event/create-event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          }
        }
      );

      // Reset form
      setTitle("");
      setEndTime("");
      setPoster(null);
      setPreviewUrl(null);

      // Refresh event list
      fetchEvents();

      setNotification({
        show: true,
        message: "Event added successfully!",
        type: "success"
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3001);
    } catch (error) {
      console.error("Error adding event:", error);
      setNotification({
        show: true,
        message: error.response?.data?.message || "Failed to add event",
        type: "error"
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3001);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5001/api/event/delete-event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update UI
      setEvents(events.filter(event => event._id !== id));
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert("Failed to delete event");
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-card">
        <h2>Add New Event</h2>
        <div className="event-creator">
          <div className="event-details">
            <div className="input-group">
              <label>Event Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
              />
            </div>
            <div className="input-group">
              <label>Event End Date & Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="input-group poster-upload">
              <label>Event Poster</label>
              <input
                type="file"
                id="posterUpload"
                accept="image/*"
                onChange={handlePosterSelect}
                className="file-input"
              />
              <label htmlFor="posterUpload" className="upload-btn">
                {poster ? "Change Image" : "Select Image"}
              </label>
            </div>
          </div>

          <div className="poster-preview">
            {previewUrl ? (
              <img src={previewUrl} alt="Event poster preview" />
            ) : (
              <div className="no-preview">
                <p>No image selected</p>
                <p>Preview will appear here</p>
              </div>
            )}
          </div>
        </div>

        <button
          className={`add-event-btn ${isLoading ? "loading" : ""}`}
          onClick={handleAddEvent}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Event"}
        </button>
      </div>

      {/* All Events */}
      <div className="dashboard-card">
        <h2>All Events</h2>
        <div className="event-list">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className="event-card">
                <img src={event.posterUrl} alt={event.title} className="event-image" />
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p>Ends on: {new Date(event.endTime).toLocaleString()}</p>
                  <button onClick={() => handleDelete(event._id)} className="delete-btn">
                    Delete
                  </button>
                </div>
                <button
  onClick={() => window.open(`http://localhost:5001/api/event/${event._id}/download`, "_blank")}
  className="download-btn"
>
  Download Registrations
</button>

              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>

      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
