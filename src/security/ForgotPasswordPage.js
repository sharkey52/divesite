import React, { useState } from 'react';
import '../styles/ForgotPasswordPage.css';

const ForgotPasswordPage = ({ onForgotPassword }) => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    onForgotPassword(username);
  };

  return (
    <div className="forgot-password-page">
      <h1>Forgot Password</h1>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <button type="submit" onClick={handleForgotPassword}>Submit</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;

