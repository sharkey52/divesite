import React, { useState } from 'react';
import { handleSignup } from './auth';

const SignupPage = ({ onSignupSuccess }) => {
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

  const submitSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)) {
      setError('Password must have at least 1 uppercase letter, one lower case letter, one number, one punctuation symbol, and be at least 8 characters long.');
      return;
    }
    handleSignup(email, password)
      .then((cognitoUser) => {
        console.log('Signed up successfully');
        onSignupSuccess();
      })
      .catch((error) => {
        setError(`Signup failed with error: ${error}`);
        console.error(`Signup failed with error: ${error}`);
      });
  };

  return (
    <div className="signup-page">
      <h1>Signup Page</h1>
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
  );
};

export default SignupPage;

