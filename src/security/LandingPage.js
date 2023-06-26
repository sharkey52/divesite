import React, { useState } from 'react';
import { handleLogin, handleSignup } from './auth';
import '../styles/LandingPage.css';
import atlasImage from './img.jpg';
import androidQRCode from './img.jpg';
import conservationImage from './img.jpg';
import Mission from './mission.js';
import World from './world.js';
import Apps from './apppage.js';
import Conservation from './conservation.js';
import Groups from './groups.js';
import Trips from './extended.js';


const LandingPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    handleLogin(email, password)
      .then(({ cognitoUser, userType }) => {
        console.log(`Logged in as ${userType}`);
        onLoginSuccess();
      })
      .catch((error) => {
        console.error(`Login failed with error: ${error}`);
        setError(`Login failed with error: ${error}`);
      });
  };

  const submitSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/.test(password)) {
      setError('Password must have at least 1 uppercase letter, one lower case letter, one number, one punctuation symbol, and be at least 8 characters long.');
      return;
    }
    handleSignup(email, password)
      .then((cognitoUser) => {
        console.log('Signed up successfully');
        onLoginSuccess();
      })
      .catch((error) => {
        setError(`Signup failed with error: ${error}`);
        console.error(`Signup failed with error: ${error}`);
      });
  };

  return (
    <div className="container">
      <div className="login-page">
        <h1>Login</h1>
        <form>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
      <div className="our-mission-page">
        <Mission />
      </div>
      <div className="all-around-world-page">
        <World />
      </div>
      <div className="get-the-app-page">
        <Apps />
      </div>
      <div className="conservation-page">
        <Conservation />
      </div>
      <div className="group-bookings-page">
        <Groups />
      </div>
      <div className="extended-trips-page">
        <Trips />
      </div>
      <div className="signup-page">
        <h1>Signup</h1>
        <form>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
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
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </label>
          <button type="submit" onClick={submitSignup}>Signup</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
      <div className="contact-us-page">
        <h1>Contact Us</h1>
        <form>
          <label>
            Email:
            <input type="email" />
          </label>
          <label>
            Message:
            <textarea />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;

