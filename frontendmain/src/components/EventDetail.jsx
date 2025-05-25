import React from 'react';
import './EventDetail.css';
import { playSound } from '../utils/sound';

const EventDetail = ({ event, onClose }) => {
  return (
    <div className="event-detail-modal">
      <div className="event-detail-overlay" onClick={() => { playSound('/sounds/click.mp3'); onClose();}}></div>
      <div className="event-detail-content">
        <button className="close-button" onClick={() => { playSound('/sounds/click.mp3'); onClose();}}>&times;</button>
        
        <h2>{event.title}</h2>
        
        <div className="event-detail-section">
            {event.imagePreview && (
            <div className="event-detail-section">
                <div className="event-image-container">
                <img src={event.imagePreview} alt="Event" className="event-image" />
                </div>
            </div>
            )}
          <h3>Details</h3>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
          {event.attendees && <p><strong>Attendees:</strong> {event.attendees}</p>}
          {event.dressCode && <p><strong>Dress Code:</strong> {event.dressCode}</p>}
        </div>
        
        {event.description && (
          <div className="event-detail-section">
            <h3>Description</h3>
            <p>{event.description}</p>
          </div>
        )}
        
        {event.photoAlbumLink && (
          <div className="event-detail-section">
            <h3>Photo Album</h3>
            <a href={event.photoAlbumLink} target="_blank" rel="noopener noreferrer">
              View Photos
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;