import React from 'react';
import './Friends.css';

export default function Friends() {
  return (
    <div className="friends-page">
      <h2 className="friends-title">Friends & Community</h2>

      <section className="community-section">
        <h3>Communities</h3>
        <div className="community-grid">
          {[...Array(3)].map((_, i) => (
            <div className="community-card" key={`com-${i}`}> 
              <div className="community-icon" />
              <div className="community-info">
                <div className="community-name">Community {i + 1}</div>
                <div className="community-description">A short description about this group.</div>
                <button className="join-community">Join</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="search-section">
        <h3>Find Friends</h3>
        <div className="search-bar">
          <input type="text" placeholder="Search by username..." />
          <button>Search</button>
        </div>
      </section>

      <section className="friend-section">
        <h3>Friend List</h3>
        <div className="friend-grid">
          {[...Array(6)].map((_, i) => (
            <div className="friend-card" key={i}>
              <div className="friend-avatar" />
              <div className="friend-name">Friend {i + 1}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="requests-section">
        <h3>Friend Requests</h3>
        <div className="friend-grid">
          {[...Array(2)].map((_, i) => (
            <div className="friend-card" key={`req-${i}`}> 
              <div className="friend-avatar" />
              <div className="friend-name">Request {i + 1}</div>
              <div className="request-buttons">
                <button className="accept">Accept</button>
                <button className="decline">Decline</button>
              </div>
            </div>
          ))}
        </div>
      </section>

    
    </div>
  );
}