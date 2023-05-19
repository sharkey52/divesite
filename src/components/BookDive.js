import React from 'react';
import '../styles/componentstyles/BookDive.css';

const DiveCenter = () => {
    return (
        <div className="buttonGroup">
            <button className="dc-button">Book Again</button>
            <button className="dc-button">Courses</button>
            <button className="dc-button">Group Trips</button>
            <button className="dc-button">Deals</button>
        </div>
    );
};

export default DiveCenter;

