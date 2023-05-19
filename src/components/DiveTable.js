import React from 'react';
import '../styles/componentstyles/DiveTable.css';

const DiveTable = () => {
    const dummyData = Array.from({length: 20}, (_, index) => ({
        center: `Dive Center ${index + 1}`,
        region: `Region ${index + 1}`,
        rating: (index % 5) + 1
    }));

    return (
        <table className="diveTable">
            <thead>
                <tr>
                    <th>Dive Center</th>
                    <th>Region</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {dummyData.map((row, index) => (
                    <tr key={index}>
                        <td>{row.center}</td>
                        <td>{row.region}</td>
                        <td>{row.rating}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DiveTable;

