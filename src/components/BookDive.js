import React, { useState } from 'react';
import '../styles/componentstyles/BookDive.css';

const DiveCenter = () => {
  const [numDivers, setNumDivers] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hasDisabilities, setHasDisabilities] = useState(false);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleNumDiversChange = (event) => {
    setNumDivers(Number(event.target.value));
  };

  const handleDisabilitiesChange = (event) => {
    setHasDisabilities(event.target.checked);
  };

  return (
    <div className="diveCenter">
      <div className="buttonGroup">
        <button className="dc-button">Book Again</button>
        <button className="dc-button">Courses</button>
        <button className="dc-button">Group Trips</button>
        <button className="dc-button">Deals</button>
      </div>
      <div className="booking-form">
        <form action="booking.php" method="post">
          <label htmlFor="name">Your Name</label>
          <input type="text" name="name" placeholder="Your name" />

          <label htmlFor="email">Your Email</label>
          <input type="email" name="email" placeholder="Your email" />

          <label htmlFor="date">Date of Booking</label>
          <input type="date" name="date" placeholder="Date of booking" />

          <label htmlFor="numDivers">Number of Divers</label>
          <select name="numDivers" id="numDivers" onChange={handleNumDiversChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            {/* Add more options if needed */}
          </select>

          {numDivers <= 4 && (
            <div>
              {[...Array(numDivers)].map((_, index) => (
                <div key={index}>
                  <label htmlFor={`certification_level_${index + 1}`}>Diver {index + 1} Certification Level</label>
                  <select name={`certification_level_${index + 1}`} id={`certification_level_${index + 1}`}>
                    <option value="beginner">Beginner</option>
                    <option value="certified">Certified</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
              ))}
            </div>
          )}

          {numDivers <= 4 && (
            <div>
              <label htmlFor="disabilities">Any Disabilities in the Group?</label>
              <input type="checkbox" name="disabilities" id="disabilities" onChange={handleDisabilitiesChange} />
            </div>
          )}

          {!selectedRegion && numDivers <= 4 && (
            <div>
              <label htmlFor="region">Region</label>
              <select name="region" id="region" onChange={handleRegionChange}>
                <option value="">Select a region</option>
                <option value="south-america">South America</option>
                <option value="caribbean">Caribbean</option>
                <option value="west-coast-usa">West Coast USA</option>
                {/* Add more options for other regions */}
              </select>
            </div>
          )}

          {selectedRegion && (
            <div className="region-box">
              {/* Red rectangle or region-specific content */}
            </div>
          )}

          {numDivers <= 4 && (
            <input type="submit" value="Book Now" className="submit-button" />
          )}
        </form>
      </div>
    </div>
  );
};

export default DiveCenter;

