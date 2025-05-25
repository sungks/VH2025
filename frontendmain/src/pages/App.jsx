import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Events from './Events';
import Friends from './Friends';
import Discovery from './Discovery';
import Profile from './Profile';
import Recomendations from './Recomendations';
import { EventsProvider } from '../components/EventsContext';

function App() {
  return (
    <Router>
      <EventsProvider>
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Events />} />
            <Route path="events" element={<Events />} />
            <Route path="friends" element={<Friends />} />
            <Route path="discovery" element={<Discovery />} />
            <Route path="profile" element={<Profile />} />
            <Route path="recomendations" element={<Recomendations />} />
          </Route>
        </Routes>
      </EventsProvider>
    </Router>
  )
}

export default App
