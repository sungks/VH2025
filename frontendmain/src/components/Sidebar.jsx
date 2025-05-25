import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import './Sidebar.css';
import LiveLinkLogoSmall from '../assets/LiveLinkLogoSmall.png';
//import NewEvent from './NewEvent';
import NewEvent from './NewEventFigma';

import axios from 'axios'; //added
import { useEvents } from './EventsContext';

  const Sidebar = () => {
    const [showNewEvent, setShowNewEvent] = useState(false);
    const handleButtonClick = () => {
      setShowNewEvent(true);
    };

    const handleCloseNewEvent = () => {
      setShowNewEvent(false);
    };

    const { addEvent } = useEvents();

  const handleCreateEvent = async (eventData) => { //added
    try {
      const response = await axios.post('/api/events', eventData);
      console.log("✅ Event created:", response.data);
      alert("Event created!");
    } catch (error) {
      console.error("❌ Error creating event:", error);
      alert("Error creating event.");
    }
  };

    const [isHovered, setIsHovered] = useState(false);

    return (
      <div className="app-container">
        <nav className="sidebar">
          <img src={LiveLinkLogoSmall} alt="Logo" />
          <NavLink to="/events" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            {({ isActive }) => (
              <NavItemContent 
                isActive={isActive}
                inactiveSrc="/MyLinks1.svg"
                activeSrc="/MyLinks2.svg"
                hoverSrc="/MyLinks3.svg"
              />
            )}
          </NavLink>

          <NavLink to="/friends" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            {({ isActive }) => (
              <NavItemContent 
                isActive={isActive}
                inactiveSrc="/Friends1.svg"
                activeSrc="/Friends2.svg"
                hoverSrc="/Friends3.svg"
              />
            )}
          </NavLink>

          <NavLink to="/discovery" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            {({ isActive }) => (
              <NavItemContent 
                isActive={isActive}
                inactiveSrc="/Discovery1.svg"
                activeSrc="/Discovery2.svg"
                hoverSrc="/Discovery3.svg"
              />
            )}
          </NavLink>

          <NavLink to = "/recomendations">recomendations
          </NavLink>

          <div className="bottomSidebar">

            <button 
            onClick={handleButtonClick}
            className="image-button"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            
            <img 
              src={isHovered ? '/AddActivity2.svg' : '/AddActivity1.svg'} 
              alt="Button icon"
              className="button-icon"
            />
          </button>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            {({ isActive }) => (
              <NavItemContent 
                isActive={isActive}
                inactiveSrc="/Profile1.svg"
                activeSrc="/Profile2.svg"
                hoverSrc="/Profile3.svg"
              />
            )}
          </NavLink>
          </div>
        
        </nav>
        
        <div className="main-content">
          {showNewEvent && (
          <NewEvent 
            onClose={handleCloseNewEvent} 
            onCreateEvent={(newEvent) => {
              addEvent(newEvent);
              handleCloseNewEvent();
            }}
          />
        )}
          <Outlet />
        </div>
        </div>
        
    );
  };

  const NavItemContent = ({ isActive, inactiveSrc, activeSrc, hoverSrc, text }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className="nav-content"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isActive ? (
          <img src={activeSrc} alt={`${text} Active`} className="nav-icon" />
        ) : isHovered ? (
          <img src={hoverSrc} alt={`${text} Hover`} className="nav-icon" />
        ) : (
          <img src={inactiveSrc} alt={`${text} Inactive`} className="nav-icon" />
        )}
        <span className="nav-text">{text}</span>
      </div>
    );
};

  export default Sidebar;
