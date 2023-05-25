import React, { useState } from 'react';
import { handleLogin } from './auth';
import '../styles/LandingPage.css';

const LandingPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    handleLogin(username, password)
      .then(({ cognitoUser, userType }) => {
        console.log(`Logged in as ${userType}`);
        onLoginSuccess(); // Call the onLoginSuccess function
      })
      .catch((error) => {
        console.error(`Login failed with error: ${error}`);
      });
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
        <button type="submit" onClick={submitLogin}>Login</button>
      </form>
    </div>
  );
};

export default LandingPage;

