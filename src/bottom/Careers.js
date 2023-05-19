import React from 'react';
import '../styles/bottomstyles.css';

const CareersPage = () => {
  return (
    <div className="careers-container">
      <h1 className="careers-title">Join Our Team</h1>
      <p className="careers-description">
        We are always looking for talented individuals to join our team and help us build amazing scuba software.
        If you are passionate about scuba diving and software development, we'd love to hear from you!
      </p>
      <div className="careers-positions">
        <h2 className="positions-title">Open Positions</h2>
        <ul className="positions-list">
          <li>Software Engineer</li>
          <li>UI/UX Designer</li>
          <li>Quality Assurance Analyst</li>
        </ul>
      </div>
      <p className="careers-contact">
        To apply for any of the positions, please send your resume and cover letter to careers@divesite.com.
        We look forward to hearing from you!
      </p>
    </div>
  );
};

export default CareersPage;

