import React from 'react';
import './styles/Dashboard.css';
import MyComponent from './centers.js'

const Dashboard = ({ user, onLogout }) => {
  const userType = user?.userType;

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="Dashboard">
      <h1>Welcome to the Dashboard</h1>
      <p>User Type: {userType}</p>
      return <MyComponent />;
    </div>
  );
};

export default Dashboard;

