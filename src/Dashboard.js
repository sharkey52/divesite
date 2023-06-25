import React from 'react';
import './styles/Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const userType = user?.userType;

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <p>User Type: {userType}</p>
    </div>
  );
};

export default Dashboard;

