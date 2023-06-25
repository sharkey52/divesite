import React, { useState } from 'react';
import { handleLogin, handleSignup } from './auth';
import '../styles/LandingPage.css';
import atlasImage from './img.jpg';
import iosQRCode from './img.jpg';
import androidQRCode from './img.jpg';
import conservationImage from './img.jpg';
import Mission from './mission.js';

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
	<h4>hi there</h4>
      </div>
      <div className="all-around-world-page">
        <h1>All Around The World</h1>
        <img src={atlasImage} alt="Atlas" />
        <p>Numbers and stats around the page...</p>
      </div>
      <div className="get-the-app-page">
        <h1>Download our application!</h1>
        <div className="app-images">
          <div className="app-image">
            <img src={iosQRCode} alt="alt"/>
            <p>For iOS</p>
          </div>
          <div className="app-image">
            <img src={androidQRCode} alt="alt"/>
            <p>For Android</p>
          </div>
        </div>
      </div>
      <div className="conservation-page">
        <h1>Conservation</h1>
        <div className="conservation-content">
          <img src={conservationImage} alt="Conservation" />
          <p>Text about conservation...</p>
        </div>
      </div>
      <div className="group-bookings-page">
        <h1>Group Bookings</h1>
        <button>Groups</button>
        <button>Schools</button>
        <button>Corporate</button>
        <button>Training</button>
      </div>
      <div className="extended-trips-page">
        <h1>Extended Trips</h1>
        <button>Research</button>
        <button>Zero to Hero</button>
        <button>Gap Years</button>
        <button>Become an Instructor</button>
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

