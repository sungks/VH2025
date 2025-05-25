import React from "react";
import faSolidBreadSlice from "/fa-solid_crown.svg";
import faSolidCalendarDay from "/fa-solid_crown.svg";
import faSolidClock from "/fa-solid_crown.svg";
import faSolidCrown from "/fa-solid_crown.svg";
import faSolidMapPin from "/fa-solid_crown.svg";
import faSolidWalking from "/fa-solid_crown.svg";
import placeholderImage from "/fa-solid_crown.svg";
import mediumActionButton from "/fa-solid_crown.svg";
import "./EventCard.css";

export const EventCard = ({ event }) => {
  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time to AM/PM format
  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  return (
    <div className="event-card">
      <div className="event-header">
        <img className="event-image" alt="Event" src={placeholderImage} />
        
        <div className="event-title-group">
          <div className="event-title">{event.title || "Untitled Event"}</div>
          <p className="event-description">{event.description || "No description provided"}</p>
        </div>

        <img
          className="event-action-button"
          alt="Action button"
          src={mediumActionButton}
        />
      </div>

      <div className="event-host-info">
        <div className="host-group">
          <img className="host-icon" alt="Host" src={faSolidCrown} />
          <div className="host-name">You</div>
        </div>

        <div className="attendees-group">
          <img className="attendees-icon" alt="Attendees" src={faSolidWalking} />
          <div className="attendees-count">
            {event.attendees ? `1/${event.attendees} people` : "No limit set"}
          </div>
        </div>
      </div>

      <div className="event-details">
        <div className="detail-group">
          <img className="detail-icon" alt="Location" src={faSolidMapPin} />
          <p className="detail-text">{event.location || "Location not specified"}</p>
        </div>

        <div className="detail-group">
          <img className="detail-icon" alt="Time" src={faSolidClock} />
          <div className="detail-text">{formatTime(event.time)}</div>
        </div>

        <div className="detail-group">
          <img className="detail-icon" alt="Date" src={faSolidCalendarDay} />
          <div className="detail-text">{formatDate(event.date) || "Date not specified"}</div>
        </div>
      </div>

      <div className="additional-details-title">Additional Details</div>

      <div className="additional-details">
        <div className="detail-group">
          <img className="detail-icon" alt="Dress code" src={faSolidBreadSlice} />
          <div className="detail-text">{event.dressCode || "N/A"}</div>
        </div>
      </div>

      <div className="photo-album-section">
        <img className="photo-album-thumbnail" alt="Album" src={placeholderImage} />
        <div className="photo-album-title">Photo Album</div>
        {event.photoAlbumLink && (
          <a href={event.photoAlbumLink} className="photo-album-link">
            View Album
          </a>
        )}
      </div>
    </div>
  );
};