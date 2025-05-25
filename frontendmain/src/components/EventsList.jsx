import React from 'react';
import { useEvents } from './EventsContext';
import NewEvent from './NewEvent';
import EventFeed from './EventFeed';

const EventsList = () => {
  const { events } = useEvents(); // get events from context

  return (
    <div>
      <EventFeed events={events} />
    </div>
  );
};

export default EventsList;

