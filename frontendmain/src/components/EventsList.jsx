import React, { useState } from 'react';
import { useEvents } from './EventsContext';
import EventDetail from './EventDetail'; // We'll create this next
import './EventsList.css';

const EventsList = () => {
  const { events } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="events-container">
      <h1 className="events-title">My Events</h1>
      {events.length === 0 ? (
        <p className="no-events-message">No events yet. Create your first event!</p>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div 
              key={event.id} 
              className="event-card"
              onClick={() => setSelectedEvent(event)}
            >
            {event.imagePreview && (
                <div className="event-card-image">
                  <img src={event.imagePreview} alt={event.title} />
                </div>
              )}
              <div className="event-card-content">
                <h3 className="event-title">{event.title}</h3>
                <div className="event-details">
                  <p><span className="detail-label">Date:</span> {event.date}</p>
                  <p><span className="detail-label">Time:</span> {event.time}</p>
                  <p><span className="detail-label">Location:</span> {event.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedEvent && (
        <EventDetail 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default EventsList;

