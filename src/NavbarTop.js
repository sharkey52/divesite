import React, { useState, useContext } from 'react';
import './styles/NavbarTop.css';
import logo from './media/logo.png';
import { ThemeContext } from './ThemeContext';

const NavbarTop = ({ username, onModeChange, onLogout }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedMode, setSelectedMode] = useState('user');
  const { theme, setTheme } = useContext(ThemeContext);

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    onModeChange(mode);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const modeButtonClass = (mode) => {
    return selectedMode === mode ? 'mode-button mode-button--selected' : 'mode-button';
  };

  const handleThemeChange = (theme) => {
    setTheme(theme);
    setDropdownVisible(false);
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
            <li className={modeButtonClass('user')} onClick={() => handleModeChange('user')}>
              Mode: User
            </li>
            <li className={modeButtonClass('staff')} onClick={() => handleModeChange('staff')}>
              Mode: Staff
            </li>
            <li className={modeButtonClass('manager')} onClick={() => handleModeChange('manager')}>
              Mode: Manager
            </li>
            <li onClick={onLogout}>Logout</li>
            <li onClick={() => handleThemeChange('light')}>Theme: Light</li>
            <li onClick={() => handleThemeChange('dark')}>Theme: Dark</li>
            <li onClick={() => handleThemeChange('ocean')}>Theme: Ocean</li>
            <li onClick={() => handleThemeChange('candyfloss')}>Theme: Candy Floss</li>
            <li onClick={() => handleThemeChange('soho')}>Theme: Soho</li>
            <li onClick={() => handleThemeChange('basic')}>Theme: Basic</li>
            <li>Zoom</li>
            <li>Other Settings</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavbarTop;

