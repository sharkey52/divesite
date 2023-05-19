import React from 'react';
import './styles/NavbarLeft.css';

const NavbarLeftUser = ({ onContentChange }) => {
  const handleClick = (e) => {
    onContentChange(e.target.getAttribute('data-content'));
  };

  return (
    <div className="navbar-left">
      <ul>
        <li data-content="bookadive" onClick={handleClick}>Book a dive</li>
        <li>Find a trip</li>
        <li data-content="logbook" onClick={handleClick}>Logbook</li>
        <li>Learn</li>
        <li>Feed</li>
      </ul>
    </div>
  );
};

export default NavbarLeftUser;

