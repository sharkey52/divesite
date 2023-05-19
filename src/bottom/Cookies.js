// divesite/src/bottom/CookiesPage.js

import React from 'react';
import '../styles/bottomstyles.css';

const CookiesPage = () => {
  return (
    <div className="cookies-container">
      <h1 className="cookies-title">Cookie Policy</h1>
      <p className="cookies-content">
        We use cookies to enhance your experience on our scuba software website.
        By continuing to browse this site, you agree to our use of cookies.
      </p>
      <div className="cookies-buttons">
        <button className="cookies-button">Accept</button>
        <button className="cookies-button">Decline</button>
      </div>
      <p className="cookies-note">
        Note: If you decline, some features of the website may not be available.
      </p>
    </div>
  );
};

export default CookiesPage;

