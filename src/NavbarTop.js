import React, { useState} from 'react';
import './styles/NavbarTop.css';
import logo from './media/logo.png';

const NavbarTop = ({ username, onModeChange, onLogout }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="navbar-top">
      <div className="navbar-top__logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div className="navbar-top__username">{username}</div>
      <div className="navbar-top__settings">
        <span onClick={toggleDropdown}>Settings</span>
        {dropdownVisible && (
          <ul>
            <li onClick={onLogout}>Logout</li>
            <li>Zoom</li>
            <li>Other Settings</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavbarTop;

