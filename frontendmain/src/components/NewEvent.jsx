import React, { useState } from "react";
import "./NewEvent.css";

const NewEvent = ({ onClose, onCreateEvent }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    time: "",
    date: "",
    attendees: "",
    dressCode: "",
    photoAlbumLink: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!eventData.title || !eventData.location || !eventData.date || !eventData.time) {
      alert("Please fill in all required fields (Title, Location, Date, Time)");
      return;
    }
    
    onCreateEvent(eventData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        <h2>Create New Event</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group required">
            <label>Event Title</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              placeholder="Enter description (optional)"
            />
          </div>

          <div className="form-row">
            <div className="form-group required">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </div>

            <div className="form-group required">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group required">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Number of Attendees (optional)</label>
              <input
                type="number"
                name="attendees"
                value={eventData.attendees}
                onChange={handleChange}
                placeholder="Enter number"
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Dress Code (optional)</label>
            <input
              type="text"
              name="dressCode"
              value={eventData.dressCode}
              onChange={handleChange}
              placeholder="Enter dress code"
            />
          </div>

          <div className="form-group">
            <label>Photo Album Link (optional)</label>
            <input
              type="url"
              name="photoAlbumLink"
              value={eventData.photoAlbumLink}
              onChange={handleChange}
              placeholder="Enter link for photo album"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="create-button">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEvent;