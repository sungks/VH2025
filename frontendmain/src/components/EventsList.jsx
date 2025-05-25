import React from 'react';
import { useEvents } from './EventsContext';
import './EventsList.css';

const EventsList = () => {
  const { events } = useEvents();

  return (
    <div className="events-container">
      <h1 className="events-title">My Events</h1>
      {events.length === 0 ? (
        <p className="no-events-message">No events yet. Create your first event!</p>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <h3 className="event-title">{event.title}</h3>
              <div className="event-details">
                <p><span className="detail-label">Date:</span> {event.date}</p>
                <p><span className="detail-label">Time:</span> {event.time}</p>
                <p><span className="detail-label">Location:</span> {event.location}</p>
                {event.description && (
                  <p className="event-description">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;