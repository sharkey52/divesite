import React, { useState } from 'react';
import '../styles/LandingPage.css';
const LandingPage = ({ onLogin, onSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    onSignUp(username, password);
  };

  return (
    <div className="landing-page">
      <h1>Welcome to the Landing Page</h1>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit" onClick={handleLogin}>Login</button>
        <button type="submit" onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
};

export default LandingPage;

