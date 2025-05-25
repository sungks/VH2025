import React, { createContext, useState, useContext } from 'react';

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, { ...newEvent, id: Date.now() }]);
  };

  const updateEvent = (id, updatedFields) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === id ? { ...event, ...updatedFields } : event
      )
    );
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);