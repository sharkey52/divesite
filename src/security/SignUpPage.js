import React, { useState } from 'react';
import '../styles/SignUpPage.css';

const SignUpPage = ({ onSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    await onSignUp(username, password, email);
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
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
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <button type="submit" onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;

