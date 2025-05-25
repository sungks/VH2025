import React, { useState } from 'react';
import './EventFeed.css';
import EventDetail from './EventDetail';
import { useEvents } from './EventsContext';

export default function EventFeed({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { updateEvent } = useEvents();
  const [transitionId, setTransitionId] = useState(null);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const closeDetail = () => {
    setSelectedEvent(null);
  };

  const handleJoinToggle = (eventId, currentStatus) => {
    setTransitionId(eventId); // apply animation whether joining or unjoining
    updateEvent(eventId, { joined: !currentStatus });
    setTimeout(() => setTransitionId(null), 600);
  };

  return (
    <div className="event-feed-container">
      <section className="event-section">
        <h3>Current Activities</h3>
        {events.filter(e => !e.joined).length === 0 ? (
            <p className="no-events-message">Uh oh! No current activities, either make one or make some friends.</p>) : (
            <div className="card-scroll">
            {events
                .filter(e => !e.joined)
                .map(event => (
                <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => handleCardClick(event)}
                    onJoinToggle={handleJoinToggle}
                    transition={event.id === transitionId}
                />
                ))}
            </div>
            )}
      </section>

      <section className="event-section">
        <h3>Your Activities</h3>
        {events.filter(e => e.joined).length === 0 ? (
            <p className="no-events-message">No activities scheduled .... go outside !</p>) : (
            <div className="card-scroll">
            {events
                .filter(e => e.joined)
                .map(event => (
                <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => handleCardClick(event)}
                    onJoinToggle={handleJoinToggle}
                    transition={event.id === transitionId}
                />
                ))}
            </div>
        )}
      </section>

      {selectedEvent && (
        <EventDetail event={selectedEvent} onClose={closeDetail} />
      )}
    </div>
  );
}

function EventCard({ event, onClick, onJoinToggle, transition }) {
  return (
    <div
      className={`event-card ${transition ? 'join-transition' : ''}`}
      onClick={onClick}
    >
      {event.imagePreview && (
        <div className="event-image-container">
          <img src={event.imagePreview} alt="Event" className="event-card-image" />
        </div>
      )}
      <div className="event-info">
        <h4>{event.title}</h4>
        <p>{event.description}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
      </div>
      <div
        className={`figma-action-button ${event.joined ? 'joined-style' : 'join-style'}`}
        onClick={(e) => {
          e.stopPropagation();
          onJoinToggle?.(event.id, event.joined);
        }}
      >
        <span className="figma-action-button-text">
          {event.joined ? 'leave :(' : 'JOIN!'}
        </span>
      </div>
    </div>
  );
}
