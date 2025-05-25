import React, { useState } from 'react';
import './NewEvent.css';
import { playSound } from '../utils/sound';

export default function NewEvent({ onClose, onCreate }) {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    hour: '',
    minute: '',
    ampm: 'AM',
    date: '',
    attendees: 0,
    description: '',
    imagePreview: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const toggleAmpm = () => {
    setFormData({ ...formData, ampm: formData.ampm === 'AM' ? 'PM' : 'AM' });
  };

  const incrementAttendees = () => {
    setFormData((prev) => ({ ...prev, attendees: prev.attendees + 1 }));
  };

  const decrementAttendees = () => {
    setFormData((prev) => ({ ...prev, attendees: Math.max(0, prev.attendees - 1) }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImage(preview);
      setFormData((prev) => ({ ...prev, imagePreview: preview }));
    }
  };

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = ['00', '15', '30', '45'];

  const handleSubmit = () => {
    const { title, location, date, hour, minute, ampm, attendees, description,imagePreview } = formData;
    const requiredFields = ['title', 'location', 'date', 'hour', 'minute'];
    let hasMissing = false;

    requiredFields.forEach(id => {
      const el = document.getElementById(id);
      if (!formData[id]) {
        el.classList.add('show-invalid');
        hasMissing = true;
        // Remove the highlight after a short delay
        setTimeout(() => el.classList.remove('show-invalid'), 720);
      }
    });

    if (hasMissing) return;

    onCreate({
      title,
      location,
      date,
      time: `${hour}:${minute} ${ampm}`,
      attendees,
      description,
      imagePreview,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={() => { playSound('/sounds/click.mp3'); onClose(); }}>&times;</button>
        <h2>Create New Activity</h2>
        <div className="modal-body">
          <div className="form-row">
            <div className="form-group required">
              <label htmlFor="title">Activity Title</label>
              <input id="title" type="text" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group required">
              <label htmlFor="location">Location</label>
              <input id="location" type="text" value={formData.location} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group required">
              <label htmlFor="time">Start Time</label>
              <div className="time-dropdowns">
                <select value={formData.hour} onChange={handleChange} id="hour" required>
                  <option value="">Hour</option>
                  {hours.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
                <span>:</span>
                <select value={formData.minute} onChange={handleChange} id="minute" required>
                  <option value="">Minute</option>
                  {minutes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <button type="button" className="ampm-toggle" onClick={toggleAmpm}>{formData.ampm}</button>
              </div>
            </div>
            <div className="form-group required">
              <label htmlFor="date">Date</label>
              <input id="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group ">
              <label htmlFor="attendees">Max People</label>
              <div className="attendee-input-wrapper">
                <button type="button" className="attendee-button" onClick={decrementAttendees} disabled={formData.attendees === 0}>-</button>
                <input
                  id="attendees"
                  type="number"
                  value={formData.attendees}
                  onChange={(e) => handleChange({ target: { id: 'attendees', value: Math.max(0, parseInt(e.target.value) || 0) } })}
                />
                <button type="button" className="attendee-button" onClick={incrementAttendees}>+</button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="dress">Dress Code</label>
              <input id="dress" type="text" placeholder="e.g. Casual, Formal" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" value={formData.description} onChange={handleChange} placeholder="Brief description of the activity"></textarea>
          </div>

          <div className="form-group image-upload-container">
            <label>Upload Image</label>
            <label htmlFor="upload-image" className={image ? "image-preview" : "upload-button"}>
              {image ? (
                <>
                  <img src={image} alt="Preview" />
                  <span className="change-image-text">Change Image</span>
                </>
              ) : (
                "Click to upload image"
              )}
            </label>
            <input
              id="upload-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className="form-actions">
          <button className="cancel-button" onClick={() => { playSound('/sounds/click.mp3'); onClose(); }}>Cancel</button>
          <button className="create-button" onClick={() => { playSound('/sounds/click.mp3'); handleSubmit(); }}>Create Activity</button>
        </div>
      </div>
    </div>
  );
}